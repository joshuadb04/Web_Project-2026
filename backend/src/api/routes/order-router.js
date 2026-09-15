import express from "express";
import { getOrderList, postOrder, getOrderById, putOrder, deleteOrder } from "../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.route("/").get(getOrderList).post(postOrder);
orderRouter.route("/:id").get(getOrderById).put(putOrder).delete(deleteOrder);

export default orderRouter;
