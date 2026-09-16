import express from "express";
import userRouter from "./routes/user_router.js";
import menuRouter from "./routes/menu_router.js";
//import promisePool from "../utils/database.js";
const router = express.Router();

///router.post("/users", (req, res) => {
/// res.send("test");
///});

router.use("/users", userRouter);
router.use("/menu", menuRouter);
//const test = async () => {
// const result = await promisePool.query("SELECT * FROM users");
// console.log(result);
//};
//test();
export default router;
