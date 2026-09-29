import express from "express";
import { login, postUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.route("/login").post(login);

export default userRouter;
