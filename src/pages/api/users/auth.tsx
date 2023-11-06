//api 라우트 생성 (server)
//http://localhost:3000/api/auth 에서 json응답 확인 가능

import { NextApiHandler } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const { phone, email } = req.body;
  console.log(req.body);

  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          //이 조건을 만족하는 user가 있는 경우 token과 연결
          where: {
            ...user,
          },
          //없으면 create
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
  return res.json({
    ok: true,
  });
};

export default withHandler("POST", handler);
