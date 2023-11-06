//to handle {withIronSessionApiRoute} more simple!

import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrot-cookie",
  password: process.env.COOKIE_PASSWORD!,
};

//Get the session from api route
export function withApiSession(handler: any) {
  return withIronSessionApiRoute(handler, cookieOptions);
}

//get session server side rendering
