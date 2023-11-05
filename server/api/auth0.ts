import { nanoid } from "nanoid";

// Define the state with string index signature and number as the value
const state: Record<string, number> = {}; 

const genState = (): string => {
  const s = nanoid();
  state[s] = 1;
  return s;
}

// Assuming useRuntimeConfig is defined somewhere and its return type is known
const runtime = useRuntimeConfig();

export const loginRedirectUrl = (): string => 
  `${runtime.ISSUER}authorize?response_type=id_token&response_mode=form_post&client_id=${runtime.AUTH0_CLIENTID}&scope=openid%20email&redirect_uri=${encodeURIComponent(runtime.BASEURL + "api/callback")}&nonce=${genState()}`;

export const logoutRedirectUrl = (id_token: string): string => 
  `${runtime.ISSUER}oidc/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${encodeURIComponent(runtime.BASEURL + "api/logout-complete")}&nonce=${genState()}`;

export const verifyNonce = (nonce: string): boolean => {
  if (state[nonce]) {
    delete state[nonce];
    return true;
  }
  return false;
}
