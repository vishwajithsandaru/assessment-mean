import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config as AuthConfig } from '../config/auth';

export const SignUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then(() => {
      const payload = {
        userId: user.username,
        email: user.email,
      };
      const token = jwt.sign(payload, AuthConfig.SECRET, {
        expiresIn: 180,
        algorithm: 'HS256',
      });

      res.send({ status: 'S', token, message: 'User Registered Successfully' });
    })
    .catch((err) => {
      res.status(400).send({ status: 'E', message: err });
    });
};

export const SignIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.status(404).send({ status: 'E', message: 'Username not found' });
    } else {
      const pwdcheck = bcrypt.compareSync(req.body.password, user.password);
      if (pwdcheck) {
        const payload = {
          userId: user.username,
          email: user.email,
        };
        const token = jwt.sign(payload, AuthConfig.SECRET, {
          expiresIn: 180,
          algorithm: 'HS256',
        });

        res.status(200).send({
          status: 'S',
          token: token,
        });
      } else {
        return res
          .status(401)
          .send({ status: 'E', message: 'Password Invalid' });
      }
    }
  } catch (err) {
    res.status(500).send({ status: 'E', message: err });
  }

  User.findOne({ username: req.body.username }).exec;
};
