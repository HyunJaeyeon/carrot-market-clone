//api 라우트 생성 (server)
//http://localhost:3000/api/client-test 에서 json응답 확인 가능
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

//connection handler 함수
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await client.user.create({
    data: {
      name: "Jen",
      email: "Jen@prisma.com",
    },
  });
  res.json({
    ok: true,
  });
}
