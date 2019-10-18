/**
  Copyright 2019 Dynatrace LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

export default (): Application => {
  const app = express();
  app.use(morgan('common'));
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '2mb',
      extended: false,
    }),
  );
  app.use(cookieParser());
  app.use(helmet());
  app.set('trust proxy', 1);

  return app;
};
