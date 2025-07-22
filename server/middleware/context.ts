import {jwtVerify, importX509, decodeJwt} from "jose";
import fs from "fs";
import { PrismaClient } from "@/prisma/client/client";
import { loginRedirectUrl } from "../api/auth0";

const client = new PrismaClient();

const runtime  = useRuntimeConfig()
const key = fs.readFileSync(runtime.AUTH0_PUB_KEY_PATH).toString()
export default defineEventHandler(async (event) => {
  event.context.client = client;
  const cvtoken = getCookie(event, 'cvtoken') || '';

  if (!cvtoken && !(event.node.req.url?.includes('/api/callback'))) {
    await sendRedirect(event, loginRedirectUrl());
  } else if (cvtoken) {
    try {
      const importedKey = await importX509(key, 'RS256')
      await jwtVerify(
        cvtoken, 
        importedKey
      );
      const decoded = decodeJwt(cvtoken)
      const claims = decoded as unknown as {email:string}; 

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