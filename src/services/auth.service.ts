import { IUser } from "../types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const secret = process.env.REACT_APP_SECRET as string;

export const validatePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const signUser = (user: IUser) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      secret,
      {},
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      },
    );
  });
};

export const validateUser = (token: string): Promise<Partial<IUser>> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded as Partial<IUser>);
    });
  });
};
