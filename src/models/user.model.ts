import { Schema, model, set } from 'mongoose';
import { IUser } from '../types/user';

set('strictQuery', false)

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }
});

const UserModel = model('User', UserSchema);

export default UserModel;