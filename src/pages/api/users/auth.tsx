//api 라우트 생성 (server)
//http://localhost:3000/api/auth 에서 json응답 확인 가능

import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";

//connection handler 함수
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).end;
  }
  console.log(req.body);
  res.status(200).end();
}

// export const POST = async (req: Request) => {
//   const res = await req.json();
//   console.log(res);
//   return NextResponse.json({ res });
// };
