import { IUser } from "../types/user";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";

export const createUser = async (user: IUser, filePath: string) => {
  const { username, password } = user;
  return await UserModel.create({
    username,
    password: bcrypt.hashSync(password, 10),
    profilePicture: filePath,
  });
};

export const getUser = async (username: string): Promise<IUser | null> => {
  return UserModel.findOne({ username });
};

export const getUserById = async (_id: string) => {
  return UserModel.findOne({ _id });
};
