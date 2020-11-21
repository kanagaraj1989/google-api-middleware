import express from 'express';
import Logger from './util/logger/Logger'
import {rootRouter} from './routes/index'
import { json as bodyParserJson, urlencoded as bodyParserUrlEncoded } from 'body-parser'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import config from 'config';

const app = express();
const port = config.get('api.port');

app.listen( port, () => {
  Logger.info(`server started at http://localhost:${ port }`);
} );
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParserJson())
app.use(bodyParserUrlEncoded({ extended: false }))

app.use('/social-app', rootRouter);
