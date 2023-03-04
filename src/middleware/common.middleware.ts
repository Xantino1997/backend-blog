import multer, { Multer } from "multer";

export const uploadMiddleware = multer({ dest: "uploads/" });