import fs from "node:fs";

export const createFile = async (file: Express.Multer.File) => {
  const { originalname, path } = file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    const formattedPath = newPath.replace(/\\/g, "/");
    fs.renameSync(path, formattedPath);
    return formattedPath;
}