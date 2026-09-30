import express from "express";
import { login, postUser, getUserByToken } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.route("/login").post(login);
userRouter.route("/token").get(getUserByToken);

export default userRouter;
