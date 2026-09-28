import express from "express";
import userRouter from "./routes/user_router.js";
import menuRouter from "./routes/menu_router.js";
<<<<<<< HEAD
//import promisePool from "../utils/database.js";
=======
import promisePool from "../utils/database.js";
>>>>>>> 77a125d (hah)
const router = express.Router();

///router.post("/users", (req, res) => {
/// res.send("test");
///});

router.use("/users", userRouter);
router.use("/menu", menuRouter);
<<<<<<< HEAD
//const test = async () => {
// const result = await promisePool.query("SELECT * FROM users");
// console.log(result);
//};
//test();
=======
const test = async () => {
  const result = await promisePool.query("SELECT * FROM users");
  console.log(result);
};
test();
>>>>>>> 77a125d (hah)
export default router;
