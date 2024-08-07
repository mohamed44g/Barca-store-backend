import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import UserRouter from "./router/UserRouter";

config();
export const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", UserRouter);

mongoose
  .connect(process.env.DATABASE, {
    dbName: "BarcaStore",
  })
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "error", massage: "this resource not avialble" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
