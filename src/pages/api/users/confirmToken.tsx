//로그인 후 토큰 인증하기
//-유저: 발급받은 토큰 입력
//--서버: 토큰 비교 -> 일치 시 userId만 session에 넣고 저장 -> 해당 토큰은 삭제함 (토큰은 일회성)

import { NextApiHandler } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const { token } = req.body;

  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!foundToken) return res.status(404).end();
  //토큰 존재 -> 유저 id를 req session에 넣음
  req.session.user = {
    id: foundToken.userId,
  };

  //세션 저장
  await req.session.save();

  //방금 찾은 id의 토큰 전부 삭제
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({ ok: true });
};

//handler을 withironsession..이 함수로 감싸줬기 때문에 req.session을 확인할 수 있음
export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: false }),
);
