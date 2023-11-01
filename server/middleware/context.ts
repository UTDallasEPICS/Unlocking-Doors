//import {loginRedirectUrl} from "../api/auth0"
//import jwt from "jsonwebtoken"
/*
import fs from "fs"
import { PrismaClient } from "@prisma/client"
const client = new PrismaClient()
export default defineEventHandler(async event => {
  event.context.client = client
  const cvtoken = getCookie(event, "cvtoken") || ""
  // not logged in but trying to
  if (!cvtoken && !(event.node.req.url?.includes('/api/callback') || event.node.req.url?.includes("/Page/") || event.node.req.url?.includes("/api/page") || event.node.req.url?.includes("/"))) {
    await sendRedirect(event, loginRedirectUrl());
  } else {
    // theoretically logged in
    if (cvtoken) {
      try {
        const claims = jwt.verify(
          cvtoken, 
          fs.readFileSync(process.cwd()+"/cert-dev.pem")
        )
        event.context.claims = claims
        event.context.user = await event.context.client.user.findFirst(
          {
            where:{ email: claims.email }
          ,
          include: {
            Pages: {
              select: {
                cuid: true
              }
            }
          }
          })
        if(!event.context.user) {
          console.error(`${claims.email} not found`) 
          setCookie(event,'cvtoken','')
          setCookie(event,'cvuser','')
    
          return await sendRedirect(event, loginRedirectUrl());
        }
        // include pages ids to check if that's the family's page. 
        setCookie(event, "cvuser", JSON.stringify(event.context.user))
        /*if(event.context.user.user_role ==='family' && (event.node.req.url?.includes('/EditPage/') || event.node.req.url?.includes('/PageList/'))){
          if((event.node.req.url?.includes('/EditPage/') && (!(event.node.req.url?.includes('/EditPage/0'))))){

        }
        }
      } catch (e) {
        console.error(e) 
        setCookie(event,'cvtoken','')
        setCookie(event,'cvuser','')
    
        return await sendRedirect(event, loginRedirectUrl())
      }
    }
  }
})
*/

import { ref } from 'vue';
import createAuth0Client from '@auth0/auth0-spa-js';
import { AuthenticationClient } from 'auth0';

const username = ref('');
const password = ref('');

let auth0Client: {
  handleRedirectCallback: () => any; loginWithRedirect: (arg0: {
    redirect_uri: string; // or your specified callback URL
    username: string; password: string;
  }) => any;
};

async function setupAuth0() {

  /*
    auth0Client = await createAuth0Client({
        domain: 'YOUR_AUTH0_DOMAIN',
        client_id: 'YOUR_CLIENT_ID',
        // ... any other configurations
    });
  */

    const auth0 = new AuthenticationClient({
      domain: '{YOUR_ACCOUNT}.auth0.com',
      clientId: '{OPTIONAL_CLIENT_ID}',
      clientSecret: '{OPTIONAL_CLIENT_SECRET}',
    });

    // Handle authentication result after redirect
    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        try {
            await auth0Client.handleRedirectCallback();
            // The user is authenticated, so you can now redirect them
            window.location.replace('/desired-page-after-login');
        } catch (err) {
            console.error(err);
        }
    }
}

async function login() {
    try {
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin,  // or your specified callback URL
            username: username.value,
            password: password.value,
        });
    } catch (error) {
        console.error("Error during login:", error);
        // Handle login errors here, for example:
        alert('Error during login. Please try again.');
    }
}

setupAuth0();


