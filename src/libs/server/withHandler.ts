//api 요청의 유효성 검사, 예외처리 진행

import { NextApiHandler } from "next";

export default function withHandler(
  method: "GET" | "POST",
  handler: NextApiHandler,
): NextApiHandler {
  return async function (req, res) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(405).json({ error });
    }
  };
}
