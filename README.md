This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 구조에 대한 설명
1. server rendering, client rendering을 구분
   1. server rendering 시점에는 첫 화면에 필요한 기본 api 호출 결과를 노출하도록 함.
   2. client rendering 시점에는 user의 인터랙션에 의한 노출 처리를 함.
2. component의 구분
   1. board만 stateful 하게 구성함.
   2. 그외 컴포넌트는 stateless 하게 구성함.
   3. 공통으로 사용하고자 하는 컴포넌트는 atomic으로 그룹 구성함.
3. api 호출과 관련된 리소스는 lib 폴더안에 구성함.
4. 시간 (UTC), pagination (token) 처리에 이상 없도록 state 관리 함.
5. 추가한 lib 들은 현 next.js, react.js 버전과 충돌이 없는 범위내에서 선택하여 사용함.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
