import fs from "node:fs";

export const createFile = async (file: Express.Multer.File) => {
  const { originalname, path } = file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    return newPath;
}