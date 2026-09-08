import express from "express";
import router from "./api/index.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use("/public", express.static("public"));

export default app;
