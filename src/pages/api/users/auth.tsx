//api 라우트 생성 (server)
//http://localhost:3000/api/auth 에서 json응답 확인 가능

import { NextApiHandler } from "next";
import withHandler from "@/libs/server/withHandler";
import client from "@/libs/server/client";

const handler: NextApiHandler = async (req, res) => {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    //what we want to update
    where: {
      ...payload, //conditional statement
    },
    //not exist, create new user
    create: {
      name: "Anonymous",
      ...payload,
    },
    //if already exists, update
    update: {},
  });
  console.log(user);

  res.status(200).end();
};

export default withHandler("POST", handler);
