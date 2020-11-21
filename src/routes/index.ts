import * as express from 'express'
import {contactsRouter} from './Contacts'
import {peopleListSchema} from "../domain/People/Request/PeopleListRequestSchema";
import Logger from "winston";
import {validationResult} from "express-validator/check";
import {AuthTokenRequestSchema} from "../domain/OAuth/Request/AuthRequestSchema";
import {createAuthToken, verifyAuthToken} from "../domain/OAuth/service/AuthService";

export const rootRouter = express.Router()
rootRouter.post('/google/authToken',
  AuthTokenRequestSchema,
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const jwtPayload = {
      name: req.body.name,
      email: req.body.email,
    };
    const token = createAuthToken(jwtPayload);

    return res.status(201).json({accessToken: token});
  });

rootRouter.use((req: any, res:any, next:any) => {
  const authorizationHeader = req.headers.authorization as string

  if (!authorizationHeader) {
    return res.status(401).send({ message: 'No token provided.' })
  }

  let decodedToken
  try {
    decodedToken = verifyAuthToken(authorizationHeader.replace('Bearer ', ''));
  } catch (error) {
    return res.status(401).send({ message: error.message })
  }

  if (!decodedToken) {
    return res.status(401).send({ message: 'User unauthenticated.' })
  }
  req.body.auth = decodedToken;

  next();
})

rootRouter.use('/google/people', contactsRouter)




