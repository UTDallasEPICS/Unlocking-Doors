import jwt from "jsonwebtoken";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { loginRedirectUrl } from "../api/auth0";
import type { JwtPayload } from "jsonwebtoken";

const client = new PrismaClient();

interface MyTokenPayload extends JwtPayload {
  email?: string; 
}
const runtime  = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  event.context.client = client;
  const cvtoken = getCookie(event, 'cvtoken') || '';

  if (!cvtoken && !(event.node.req.url?.includes('/api/callback'))) {
    await sendRedirect(event, loginRedirectUrl());
  } else if (cvtoken) {
    try {
      const decoded = jwt.verify(
        cvtoken, 
        fs.readFileSync(process.cwd() + '/cert-dev.pem')
      );
      const claims = decoded as MyTokenPayload; 

      if (claims.email) {
        event.context.claims = claims;
        event.context.user = await client.user.findFirst({
          where: { username: claims.email } 
        });

        if (!event.context.user) {
          console.error(`${claims.email} not found`);
          setCookie(event, 'cvtoken', ''); 
          setCookie(event, 'cvuser', '');
          return await sendRedirect(event, loginRedirectUrl());
        }
        
        // Set the cookie with user information
        setCookie(event, 'cvuser', JSON.stringify(event.context.user));
      } else {
        // Handle the case where the email is not defined in the token payload
        throw new Error('Email not provided in token.');
      }
    } catch (e) {
      console.error(e);
      setCookie(event, 'cvtoken', '');
      setCookie(event, 'cvuser', '');
      return await sendRedirect(event, loginRedirectUrl());
    }
  }
});