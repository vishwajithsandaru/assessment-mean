import mongoose from 'mongoose';
import { User } from './user';

mongoose.Promise = global.Promise

export const db = {
    mongoose,
    user: User
}