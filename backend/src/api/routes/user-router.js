import express from "express";
import multer from "multer";
import {
  login,
  postUser,
  getUserByToken,
  putUser,
  putPassword,
  putProfilePicture,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + fileExtension);
  },
});

const upload = multer({ storage });

userRouter.route("/").post(postUser);
userRouter.route("/login").post(login);
userRouter.route("/token").get(getUserByToken);
userRouter.route("/password").put(putPassword);
userRouter.route("/:id/profile-picture").put(upload.single("profile"), putProfilePicture);
userRouter.route("/:id").put(putUser);

export default userRouter;
