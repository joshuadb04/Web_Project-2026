import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

import {
  getMenuList,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
} from "../controllers/menu-controller.js";

const menuRouter = express.Router();

menuRouter.route("/").get(getMenuList).post(authenticate, authorizeAdmin, postMenuItem);

menuRouter
  .route("/:id")
  .get(getMenuItemById)
  .put(authenticate, authorizeAdmin, putMenuItem)
  .delete(authenticate, authorizeAdmin, deleteMenuItem);

export default menuRouter;
