import express from "express";
import {
  getOrderItemList,
  getOrderItemById,
  postOrderItem,
  putOrderItem,
  deleteOrderItem,
} from "../controllers/order-item-controller.js";

const orderItemRouter = express.Router();

orderItemRouter.route("/").get(getOrderItemList).post(postOrderItem);
orderItemRouter.route("/:id").get(getOrderItemById).put(putOrderItem).delete(deleteOrderItem);

export default orderItemRouter;
