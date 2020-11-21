import config from 'config';
import { sign, verify } from 'jsonwebtoken';
import Logger from "../../../util/logger/Logger";
import {DecodedAuthToken} from "../../../util/DecodedAuthToken";

const secretKey: string = config.get('auth.secretKey');

export const createAuthToken = (payload: object) => {
  // Need to inject code to verify access_token & refresh token with Google api before create JWT token
  const token = sign(payload, secretKey);
  return token;
}

export const verifyAuthToken = (token: string): DecodedAuthToken => {
  const decodedAuthToken = verify(token, secretKey) as DecodedAuthToken;
  Logger.info('decodedAuthToken={}',decodedAuthToken)
  return decodedAuthToken;
}

