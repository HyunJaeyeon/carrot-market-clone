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
  console.log(req.session.user);

  //session id와 같은 user의 profile을 보여줌
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
};

export default withIronSessionApiRoute(withHandler("GET", handler), {
  //GET
  cookieName: "carrot_cookie",
  password: "12353323252341245435123323asdfafasasdfsfafasdfasdsdfasdadfad",
});
