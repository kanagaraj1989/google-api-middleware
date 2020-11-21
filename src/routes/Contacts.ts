import * as express from 'express'
import { Credentials } from "google-auth-library";

import { peopleListSchema } from '../domain/People/Request/PeopleListRequestSchema'
import { validationResult } from 'express-validator/check';
import PeopleService from "../domain/People/service/PeopleService";
import Logger from "../util/logger/Logger";
export const contactsRouter = express.Router()


contactsRouter.post('/list',
  peopleListSchema,
  async (req: any, res: any) => {
    Logger.info('Auth value=', req.auth);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.info('found error');
      return res.status(422).json({ errors: errors.array() });
    }

    const pageNo: number = req.query.pageSize;
    const pageSize: number = req.query.pageSize;

    const resposne = await PeopleService.getPeople(createCredential(req), pageNo, pageSize);
    Logger.info('response=', resposne);
    return res.status(200).json(resposne)
})

const createCredential = (req: any) => {
  const credential= {
    access_token: req.body.accessToken,
    token_type: 'Bearer',
    id_token: req.body.token,
    scope: 'https://www.googleapis.com/auth/contacts.readonly'
  } as Credentials;

  return credential;
}





