import express from "express";
import { body } from "express-validator";
import { validationResult } from "express-validator";
import { login, postUser } from "../controllers/user-controller.js";

const userValidation = [
  body("first_name").trim().notEmpty(),
  body("last_name").trim().notEmpty(),
  body("email").trim().isEmail(),
  body("password").isLength({ min: 6 }),
];

const loginValidation = [body("email").trim().isEmail(), body("password").isLength({ min: 6 })];

const checkValidation = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.sendStatus(400);
    return;
  }
  next();
};

const userRouter = express.Router();

userRouter.route("/").post(userValidation, checkValidation, postUser);
userRouter.route("/login").post(loginValidation, checkValidation, login);
export default userRouter;
