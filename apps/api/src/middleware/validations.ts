import { db } from '../models';

export const isUsernameExist = async (req, res, next) => {
  try {
    const user = await db.user.findOne({ username: req.body.username }).exec();

    if (user) {
      return res
        .status(400)
        .send({ status: 'E', message: 'Username already exist' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 'E', message: err });
  }
};

export const isEmailExist = async (req, res, next) => {
  try {
    const user = await db.user.findOne({ email: req.body.email }).exec();

    if (user) {
      return res
        .status(400)
        .send({ status: 'E', message: 'Email already exist' });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'E', message: err });
  }
};
