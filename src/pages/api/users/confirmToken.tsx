//api 라우트 생성 (server)
//http://localhost:3000/api/auth 에서 json응답 확인 가능

import { NextApiHandler } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const { token } = req.body;
  console.log(req.body);
  console.log(token);
  res.status(200).end();

  return res.json({
    ok: true,
  });
};

export default withHandler("POST", handler);
