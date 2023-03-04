import { Request, NextFunction, Response } from "express";
import { validateUser } from "../services/auth.service";
import { IGetUserAuthInfoRequest } from "../types/common";

export const authenticatedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const user = await validateUser(token);
    (req as IGetUserAuthInfoRequest).user = user;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Token inválido" });
  }
};