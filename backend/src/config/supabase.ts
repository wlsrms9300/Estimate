import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 테이블 목록 조회 함수
async function listTables() {
    try {
        // 단순히 현재 스키마의 테이블 목록만 조회
        const { data, error } = await supabase
            .from('TEST_MEMBER')
            .select('*')
            .limit(1);

        if (error) {
            console.error('테이블 조회 오류:', error);
            return;
        }

        console.log('TEST_MEMBER 테이블 존재 여부:', data ? '존재함' : '존재하지 않음');
        if (data) {
            console.log('테이블 샘플 데이터:', data);
        }

    } catch (error) {
        console.error('조회 오류:', error);
    }
}

// 서버 시작 시 테이블 조회
listTables();