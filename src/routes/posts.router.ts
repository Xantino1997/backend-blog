import { Router } from "express";
import { uploadMiddleware } from "../middleware/common.middleware";
import { authenticatedRoute } from "../middleware/auth.middleware";
import { createFile } from "../services/files.service";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
} from "../services/posts.service";
import { IGetUserAuthInfoRequest } from "../types/common";

const router = Router();

router.post(
  "/post",
  authenticatedRoute,
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const cover = await createFile(req.file as Express.Multer.File);
      const { title, summary, content } = req.body;
      const { _id } = (req as IGetUserAuthInfoRequest).user;
      const postDoc = await createPost({
        title,
        summary,
        content,
        author: _id as string,
        cover,
      });
      res.json(postDoc);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
);

router.put(
  "/post",
  authenticatedRoute,
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const { _id, ...content } = req.body;
      const postDoc = await updatePost(
        _id,
        content,
        req.file
          ? await createFile(req.file as Express.Multer.File)
          : undefined,
      );
      res.json(postDoc);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
);

router.get("/post", async (req, res) => {
  const { page } = req.query;
  try {
    res.json(
      await getAllPosts(typeof page === "string" ? parseInt(page) : 1),
    );
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await getPost(id));
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

export default router;
