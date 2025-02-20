import { createHash } from "crypto";

export interface AuthenticationParams {
  ts: string;
  hash: string;
}

export function generateAuthParamsPure(
  publicKey: string,
  privateKey: string,
  ts: string
): string {
  const hash = createHash("md5")
    .update(`${ts}${privateKey}${publicKey}`)
    .digest("hex");
  
  const params = new URLSearchParams({ ts, apikey: publicKey, hash });
  return `?${params.toString()}`;
}

export function generateAuthParams(publicKey: string, privateKey: string): string {
  const ts = Date.now().toString();
  return generateAuthParamsPure(publicKey, privateKey, ts);
}

