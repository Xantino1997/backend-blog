import PostModel from "../models/posts.model";
import { IPost } from "../types/post";

export const createPost = async (post: IPost) => {
  await PostModel.create(post);
};

export const updatePost = async (_id: string, update: Partial<IPost>, cover?: string) => {
  const document = await PostModel.findById(_id);
  if (!document) {
    throw new Error("Post not found");
  }
  const isAuthor = JSON.stringify(document.author) ===
    JSON.stringify(_id);
  if (!isAuthor) {
    throw new Error("You are not the author");
  }
  if (cover) {
    update.cover = cover;
  }
  Object.assign(document, update);
  await document.save();
  return document;
};

export const getPost = async (_id: string) => {
  return PostModel.findById(_id).populate("author", ["username"]);
};

export const getAllPosts = async (page: number = 1) => {
  return PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .skip((page - 1) * 50)
      .limit(50);
};
