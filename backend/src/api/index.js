import express from "express";

import menuRouter from "./routes/menu-router.js";
import orderRouter from "./routes/order-router.js";
import orderItemRouter from "./routes/order-item-router.js";
import userRouter from "./routes/user-router.js";

const router = express.Router();

router.use("/menu", menuRouter);
router.use("/orders", orderRouter);
router.use("/order-items", orderItemRouter);
router.use("/users", userRouter);

export default router;
