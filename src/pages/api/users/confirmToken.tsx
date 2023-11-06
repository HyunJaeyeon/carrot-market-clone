import { NextApiHandler } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "@/libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  console.log(req.session);
  const { token } = req.body;

  const exists = await client.token.findUnique({
    //토큰 존재하면 user, 없으면 null 반환
    where: {
      payload: token,
    },
  });
  if (!exists) return res.status(404).end();
  req.session.user = {
    id: exists.userId,
  };

  //세션 데이터 암호화하고 쿠키 설정
  await req.session.save();
  console.log(exists);
  res.status(200).end();
};

//handler을 withironsession..이 함수로 감싸줬기 때문에 req.session을 확인할 수 있음
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrot_cookie",
  password: "12353323252341245435123323asdfafasasdfsfafasdfasdsdfasdadfad",
});
