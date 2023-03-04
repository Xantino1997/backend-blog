
import { Router } from "express";
import { authenticatedRoute } from "../middleware/auth.middleware";
import { IGetUserAuthInfoRequest } from "../types/common";

const router = Router();

router.get("/profile", authenticatedRoute, (req, res) => {
  res.json((req as IGetUserAuthInfoRequest).user);
});

export default router;