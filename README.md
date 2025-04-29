# 프로젝트 소개
-  자영업자, 개인, 프리랜서 등 소상공인용 견적서 생성 웹 어플리케이션

# 프로젝트 기능 및 계획
-  기본 기능 : 회원가입, 로그인(JWT), 이메일 인증(SMTP), 회원탈퇴, 견적서 생성, 견적서 pdf/excel 다운로드
-  계획 : 사업자 정보 등록, 업체별 품목 등록, 업체별 품목 단가비교, 이메일/카카오톡으로 견적서 발송, 청구/결제, 대시보드 

# 개발 환경

-   Node.js 22.14.0 (root에 nvmrc 파일 추가. 여러 node 버전 사용 시 root에서 nvm use 명령어 실행)

## 코드 규칙

-   ESLint
-   Prettier

## FRONTEND

-   React
-   TypeScript
-   Vite
-   Ant Design
-   Tailwind CSS
-   React Query
-   Zustand
-   Axios

## BACKEND

-   Express
-   TypeScript

## DATABASE

-   Supabase

## 배포

-   Vercel

## API 문서

-   Apidog

## .env.development 파일 테스트용 (FRONTEND)

-   VITE_API_URL=http://localhost:3000

## .env 파일 테스트용 (BACKEND)

-   PORT=3000
-   JWT_SECRET_KEY=secret
-   SUPABASE_URL=https://vrwnysaepdxyuesavyuk.supabase.co
-   SUPABASE_ANON_KEY=
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyd255c2FlcGR4eXVlc2F2eXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNzc2MTksImV4cCI6MjA1Nzg1MzYxOX0.d_x-G2YZvoNkBsmgMrcR8mswRaM0bUO6omAghvtOLkY
-   MAIL_HOST=sandbox.smtp.mailtrap.io
-   MAIL_PORT=2525
-   MAIL_USER=084e3fd172a660
-   MAIL_PASS=31bd96ee444778
-   MAIL_FROM=test@estimate.com



## 프로젝트 이미지
-  메인화면
<img width="1710" alt="메인화면" src="https://github.com/user-attachments/assets/86d02367-9d50-4621-9310-d14ea9f28986" />


-  시작하기
<img width="1710" alt="시작하기" src="https://github.com/user-attachments/assets/037b27f2-b889-4962-bf8e-4e0b3a16f3ff" />
<img width="1710" alt="인증코드 입력" src="https://github.com/user-attachments/assets/a6696b98-1b1f-42d1-a80c-97eb9632e7c0" />
<img width="1710" alt="회원가입(비밀번호)" src="https://github.com/user-attachments/assets/d51aef8e-af5d-4c84-a576-d4d1d7a29b5c" />
<img width="1688" alt="회원가입(동의)" src="https://github.com/user-attachments/assets/a41e7d5e-1c4c-4aa4-b58e-a290938a998f" />
<img width="1710" alt="로그인(인증 후 비밀번호 입력)" src="https://github.com/user-attachments/assets/d7141a2b-165b-4bfe-866d-0fa1ba10806f" />
<img width="1710" alt="ValidationCheck" src="https://github.com/user-attachments/assets/19a5c6f8-b54b-46a4-a87f-b59e20ec0529" />


-  로그인 후 메인화면
<img width="1710" alt="업무 메인화면" src="https://github.com/user-attachments/assets/87c255a3-53eb-46a8-a59e-b83dc3921554" />


-  견적서 작성
<img width="1710" alt="견적서 작성" src="https://github.com/user-attachments/assets/aa529422-b2ea-4ef3-9c67-3a657d39f36d" />


-  견적서 리스트
<img width="1710" alt="견적서 리스트" src="https://github.com/user-attachments/assets/418bbd49-8783-444d-a9c3-fec6da62137d" />


-  내정보
<img width="1710" alt="내정보" src="https://github.com/user-attachments/assets/11a162c2-6d02-44ed-9104-625f02dc28d4" />


-  네비게이션 디자인
<img width="891" alt="네비게이션 디자인" src="https://github.com/user-attachments/assets/39ae7621-8cd3-47c3-a5a7-fb8fe60757c8" />
