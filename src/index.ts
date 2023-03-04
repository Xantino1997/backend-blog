import express, { json, static as serveStatic, urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";
import usersRouter from "./routes/user.router";
import postsRouter from "./routes/posts.router";
import { config } from "dotenv";

const app = express();

config();

const port = process.env.REACT_APP_PORT || 3001;
const uri = process.env.REACT_APP_URI || "mongodb://localhost:27017/blog";
const origin = process.env.REACT_APP_ORIGIN || "*";

// Usar body-parser para procesar los datos en el cuerpo de las solicitudes entrantes

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  cors({ credentials: true, origin }),
);
app.use(express.json());
app.use(cookieParser());


const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected!!')
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
    process.exit(1)
  }
}

connectDB()

app.use("/uploads", serveStatic(__dirname + "/uploads"));
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log("Runnig SERVER");
});
//
