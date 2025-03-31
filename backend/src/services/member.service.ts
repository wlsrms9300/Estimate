import { supabase } from '../config/supabase'
import { transformData, jwtUtils } from '../utils'
import { TokenPayload } from '../interfaces/auth.interface'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

// 이메일 전송을 위한 트랜스포터 설정
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

export const memberService = {
    //회원가입
    async signup(tableName: string, memberData: any) {
        let data = { ...memberData }

        data.agreeTermsOfPersonalCollection = memberData.agreeTermsOfPersonal || false
        data.agreeTermsOfPersonalUse = memberData.agreeTermsOfPersonal || false

        delete data.agreeTermsOfPersonal

        // bcrypt로 비밀번호 암호화 하기
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(data.password, salt)
        data.password = hash

        try {
            const { data: result, error } = await supabase.from(tableName).insert(transformData.toSnakeCase(data)).select()

            if (error) {
                // PostgreSQL unique violation 에러 코드: 23505
                if (error.code === '23505') {
                    return {
                        resultCd: 400, // 클라이언트 에러 코드
                        resultMsg: '이미 사용 중인 아이디입니다.' + '[' + error.message + ']',
                    }
                }
                return {
                    resultCd: 500, // 클라이언트 에러 코드
                    resultMsg: '데이터베이스 오류가 발생했습니다.' + '[' + error.message + ']',
                }
            }

            return {
                resultCd: 201, // 성공 코드
                resultMsg: '회원가입이 완료되었습니다.',
                data: transformData.toCamelCase(result),
            }
        } catch (error: any) {
            return {
                resultCd: 500, // 서버 오류 코드
                resultMsg: '회원가입 처리 중 오류가 발생했습니다.' + '[' + error.message + ']',
            }
        }
    },

    //로그인
    async login(memberData: any) {
        const { userId, password } = memberData // userId와 password를 분리
        const { data, error } = await supabase.from('EM_MEMBER').select('*').eq('user_id', userId).single() // single()을 사용하여 단일 사용자만 가져옴

        if (!data) {
            return {
                resultCd: 400, // 클라이언트 에러 코드
                resultMsg: '로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.',
            }
        }

        // 비밀번호 비교 (암호화하지 않고 직접 비교)
        if (data.password !== password) {
            return {
                resultCd: 400, // 클라이언트 에러 코드
                resultMsg: '로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.',
            }
        }

        // 토큰 페이로드 생성
        const tokenPayload: TokenPayload = {
            userId: data.user_id,
        }

        // 토큰 생성
        const { accessToken, refreshToken } = jwtUtils.generateTokens(tokenPayload)

        await this.updateUserLoginInfo(data.user_id, refreshToken)

        return {
            resultCd: 201, // 성공 코드
            resultMsg: '로그인 성공',
            user: transformData.toCamelCase(data),
            accessToken,
            refreshToken,
        }
    },

    // 로그인 정보 업데이트
    async updateUserLoginInfo(userId: string, refreshToken: string) {
        try {
            // 현재 시간 설정
            const currentTimestamp = new Date().toISOString()
            // 리프레시 토큰 만료 시간 설정 (현재 시간 + 1일)
            const expiresTimestamp = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

            // em_member 테이블 last_login_at 업데이트
            const { data: result, error: memberUpdateError } = await supabase
                .from('EM_MEMBER')
                .update({ last_login_at: currentTimestamp })
                .eq('user_id', userId)
            if (memberUpdateError) {
                return {
                    resultCd: 500,
                    resultMsg: '로그인 정보 업데이트 중 오류가 발생했습니다.' + '[' + memberUpdateError.message + ']',
                }
            }

            // em_member_refresh_token 테이블 upsert 수행
            const { error: tokenUpsertError } = await supabase.from('EM_MEMBER_REFRESH_TOKEN').upsert(
                {
                    user_id: userId,
                    refresh_token: refreshToken,
                    created_at: currentTimestamp,
                    expires_at: expiresTimestamp,
                },
                {
                    onConflict: 'user_id',
                    ignoreDuplicates: false,
                },
            )

            if (tokenUpsertError) {
                return {
                    resultCd: 500,
                    resultMsg: '리프레시 토큰 업데이트 중 오류가 발생했습니다.' + '[' + tokenUpsertError.message + ']',
                }
            }

            return true
        } catch (error: any) {
            return {
                resultCd: 500,
                resultMsg: '로그인 정보 업데이트 중 오류가 발생했습니다.' + '[' + error.message + ']',
            }
        }
    },

    //이메일 인증번호 발송
    async emailCertSend(userId: string) {
        try {
            // 기존 사용자 확인
            const { data: existingUser, error: existingUserError } = await supabase.from('EM_MEMBER').select('*').eq('user_id', userId).single()

            // 이미 등록된 사용자가 있는 경우
            if (existingUser) {
                return {
                    resultCd: 400,
                    resultMsg: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.',
                    data: transformData.toCamelCase(existingUser),
                }
            }

            // 6자리 인증번호 생성
            const certNo = Math.floor(100000 + Math.random() * 900000).toString()

            // 인증번호 DB 저장
            const { error: certError } = await supabase.from('EM_EMAIL_CERT').upsert(
                {
                    user_id: userId,
                    cert_no: certNo,
                    cert_yn: 'N',
                    created_at: new Date().toISOString(),
                    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 30분 유효
                },
                {
                    onConflict: 'user_id',
                    ignoreDuplicates: false,
                },
            )

            if (certError) {
                return {
                    resultCd: 500,
                    resultMsg: '인증번호 저장 중 오류가 발생했습니다.' + '[' + certError.message + ']',
                }
            }

            // 이메일 발송
            const mailOptions = {
                from: process.env.MAIL_FROM,
                to: userId, // userId가 이메일 주소라고 가정
                subject: '[이메일 인증] 인증번호를 확인해주세요',
                html: `
                    <h1>이메일 인증번호</h1>
                    <p>안녕하세요. 인증번호를 확인해주세요.</p>
                    <h2>${certNo}</h2>
                    <p>인증번호는 30분 동안 유효합니다.</p>
                `,
            }

            await transporter.sendMail(mailOptions)

            return {
                resultCd: 201,
                resultMsg: '인증번호가 이메일로 발송되었습니다.',
            }
        } catch (error) {
            return {
                resultCd: 500, // 서버 오류 코드
                resultMsg: '이메일 인증번호 발송 중 오류가 발생했습니다.' + '[' + error + ']',
            }
        }
    },

    //이메일 인증번호 인증
    async emailCertCheck(userId: string, certNo: string) {
        try {
            // 인증번호 확인
            const { data: certData, error: certError } = await supabase
                .from('EM_EMAIL_CERT')
                .select('*')
                .eq('user_id', userId)
                .eq('cert_no', certNo)
                .single()

            if (!certData) {
                return {
                    resultCd: 400,
                    resultMsg: '인증번호가 존재하지 않습니다.',
                }
            }

            if (certData.cert_yn === 'Y') {
                return {
                    resultCd: 400,
                    resultMsg: '이미 인증된 이메일입니다.',
                }
            }

            // 인증번호 만료 확인
            const currentTimestamp = new Date().toISOString()

            if (certData.expires_at < currentTimestamp) {
                return {
                    resultCd: 400,
                    resultMsg: '인증번호가 만료되었습니다.',
                }
            }

            // 인증번호 업데이트
            const { error: updateError } = await supabase.from('EM_EMAIL_CERT').update({ cert_yn: 'Y' }).eq('user_id', userId)
            if (updateError) {
                return {
                    resultCd: 500,
                    resultMsg: '인증번호 업데이트 중 오류가 발생했습니다.',
                }
            }

            return {
                resultCd: 201,
                resultMsg: '인증번호가 확인되었습니다.',
                data: {
                    userId: certData.user_id,
                    certNo: certData.cert_no,
                    createdAt: certData.created_at,
                    expiresAt: certData.expires_at,
                },
            }
        } catch (error) {
            return {
                resultCd: 500,
                resultMsg: '이메일 인증번호 인증 중 오류가 발생했습니다.' + '[' + error + ']',
            }
        }
    },

    async refreshAccessToken(userId: string) {
        try {
            // 데이터베이스에서 해당 userId의 리프레시 토큰 가져오기
            const { data: tokenData } = await supabase.from('EM_MEMBER_REFRESH_TOKEN').select('refresh_token').eq('user_id', userId).single()

            if (!tokenData) {
                return {
                    resultCd: 400,
                    resultMsg: '리프레시 토큰을 찾을 수 없습니다.',
                }
            }

            // 리프레시 토큰 검증
            const result = jwtUtils.verifyToken(tokenData.refresh_token)
            if (result.resultCd !== 201) {
                return result
            }

            // 새로운 접근 토큰 생성
            const tokenPayload: TokenPayload = {
                userId: userId,
            }

            const newAccessToken = jwtUtils.generateTokens(tokenPayload)

            return {
                resultCd: 201,
                resultMsg: '토큰 재발급 성공',
                data: {
                    accessToken: newAccessToken,
                },
            }
        } catch (error: any) {
            return {
                resultCd: 500,
                resultMsg: '토큰 재발급 중 오류가 발생했습니다.' + '[' + error.message + ']',
            }
        }
    },
}
