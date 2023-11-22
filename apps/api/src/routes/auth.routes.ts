import { Express, Request, Response, NextFunction } from 'express';
import {SignIn, SignUp} from '../controller/auth.controller'
import { isEmailExist, isUsernameExist } from '../middleware/validations';

const setupMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
};

export const AuthRoutes = (app: Express): void => {
  app.use(setupMiddleware);

  app.post(
    '/api/signup',
    [isUsernameExist, isEmailExist],
    SignUp
  );

  app.post(
    '/api/signin',
    SignIn
  );

};