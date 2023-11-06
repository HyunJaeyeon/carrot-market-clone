//session id와 같은 user의 profile 찾기

import { NextApiHandler } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
};

export default withApiSession(withHandler({ method: "GET", handler }));
//req.session.user, save, destroy 사용 가능
