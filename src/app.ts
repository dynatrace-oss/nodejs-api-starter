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
