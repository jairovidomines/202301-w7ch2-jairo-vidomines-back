import { Router } from "express";
import loginUser, { createUser } from "../controllers/usersControllers.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
export const upload = multer({ storage });

const usersRouter = Router();

usersRouter.post("/register", upload.single("avatar"), createUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
