import express from "express";
import connectDB from "./db/config.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
dotenv.config({ path: "./env" });
dotenv.config();
connectDB();

var app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

app.listen(8000);
