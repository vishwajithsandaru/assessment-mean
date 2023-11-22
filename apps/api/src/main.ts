/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { db } from './models';
import { config as dbConfig } from './config/db';
import { ConnectOptions } from 'mongoose';
import { AuthRoutes } from './routes/auth.routes';

const app = express();

app.use(express.json());

db.mongoose
  .connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    {} as ConnectOptions
  )
  .then(() => {
    console.log('Successfully Conntected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

AuthRoutes(app);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
