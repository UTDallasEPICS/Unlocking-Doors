import { nanoid } from "nanoid";

// Define the state with string index signature and number as the value
const state: Record<string, number> = {}; 

const genState = (): string => {
  const s = nanoid();
  state[s] = 1;
  return s;
}

const runtime = useRuntimeConfig();
export const loginRedirectUrl = (): string => 
  `${runtime.AUTH0_ISSUER_BASE_URL}/authorize?response_type=id_token&response_mode=form_post&client_id=${runtime.AUTH0_CLIENT_ID}&scope=openid%20email&redirect_uri=${encodeURIComponent(runtime.AUTH0_BASE_URL + "/api/callback")}&nonce=${genState()}`;

export const logoutRedirectUrl = (id_token: string): string => 
  `${runtime.AUTH0_ISSUER_BASE_URL}/oidc/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${encodeURIComponent(runtime.AUTH0_BASE_URL + "/api/logout_complete")}&nonce=${genState()}`;

export const verifyNonce = (nonce: string): boolean => {
  if (state[nonce]) {
    delete state[nonce];
    return true;
  }
  return false;
}