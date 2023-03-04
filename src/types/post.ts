
// title:String,
//   summary:String,
//   content:String,
//   cover:String,

import { ObjectId } from "mongoose";

//   author:{type:Schema.Types.ObjectId, ref:'User'},
export interface IPost {
  _id?: ObjectId;
  title: string;
  content: string;
  cover: string;
  author: string;
  summary: string;
};
  
  