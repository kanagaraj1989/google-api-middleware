import {checkSchema} from 'express-validator/check'

export const validateAuthBody = checkSchema({
  accessToken: {
    in: ['body'],
    errorMessage: 'access token is missing',
  },
  name: {
    in: ['body'],
    errorMessage: 'name is missing',
  },
  email: {
    in: ['body'],
    errorMessage: 'email is missing',
  },
  token: {
    in: ['body'],
    errorMessage: 'refresh token is missing',
  },
})

export const AuthTokenRequestSchema = [
  ...validateAuthBody,
]
