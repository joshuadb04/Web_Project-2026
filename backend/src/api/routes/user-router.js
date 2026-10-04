import express from "express";
import { login, postUser, getUserByToken, putUser, putPassword } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.route("/login").post(login);
userRouter.route("/token").get(getUserByToken);
userRouter.route("/password").put(putPassword);
userRouter.route("/:id").put(putUser);

export default userRouter;
