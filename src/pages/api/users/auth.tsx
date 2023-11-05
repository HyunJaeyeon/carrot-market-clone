//api 라우트 생성 (server)
//http://localhost:3000/api/auth 에서 json응답 확인 가능

import { NextApiHandler } from "next";
import withHandler from "@/libs/server/withHandler";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body);
  res.status(200).end();
};

export default withHandler("POST", handler);
