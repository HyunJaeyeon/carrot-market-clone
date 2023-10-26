//client page
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

//client.user통해 user테이블 다루기
//prisma가 schema보고 User타입 만들어줌
client.user.create({
  data: {
    name: "Jen",
    email: "Jen@prisma.com",
  },
});
