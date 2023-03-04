import { model, Schema, Types } from "mongoose";
import { IPost } from "../types/post";

const PostSchema = new Schema<IPost>({
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: Types.ObjectId,
}, {
  timestamps: true,
});

const PostModel = model("Post", PostSchema);

export default PostModel;
