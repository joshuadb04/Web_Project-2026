import express from "express";
import menuRouter from "./routes/menu-router.js";
import orderRouter from "./routes/order-router.js";

const router = express.Router();

router.use("/menu", menuRouter);
router.use("/orders", orderRouter);

export default router;
