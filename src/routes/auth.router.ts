import { Router } from "express";
import { uploadMiddleware } from "../middleware/common.middleware";
import { signUser, validatePassword } from "../services/auth.service";
import { createFile } from "../services/files.service";
import { createUser, getUser } from "../services/user.service";

const router = Router();

router.post(
  "/register",
  uploadMiddleware.single("profilePicture"),
  async (req, res) => {
    const { username, password } = req.body;
    try {
      const filePath = req.file ? await createFile(req.file) : '';
      const userDoc = await createUser(
        { username, password, profilePicture: req.file?.path },
        filePath,
      );

      res.json(userDoc);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await getUser(username);
    if (!userDoc) return res.status(400).json("wrong credentials");
    const passOk = validatePassword(password, userDoc.password);
    if (!passOk) return res.status(400).json("wrong credentials");

    const token = await signUser(userDoc);

    res.cookie("token", token).json({
      id: userDoc._id,
      username,
      profilePicture: userDoc.profilePicture,
    });
    res.json(userDoc);

  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  };
});

export default router;
