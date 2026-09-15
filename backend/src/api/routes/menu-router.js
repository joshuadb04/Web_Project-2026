import express from "express";

import {
  getMenuList,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
} from "../controllers/menu-controller.js";

const menuRouter = express.Router();

menuRouter.route("/").get(getMenuList).post(postMenuItem);

menuRouter.route("/:id").get(getMenuItemById).put(putMenuItem).delete(deleteMenuItem);

export default menuRouter;
