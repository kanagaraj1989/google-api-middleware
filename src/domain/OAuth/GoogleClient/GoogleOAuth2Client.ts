import { Credentials , OAuth2Client} from 'google-auth-library'
import { google } from 'googleapis'

export const createOAuthClient = (credential: Credentials) : OAuth2Client => {
  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
  oAuth2Client.setCredentials(credential)

  return oAuth2Client
}
