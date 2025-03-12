import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import UserRouter from "./router/UserRouter/index.js";

config();

export const app = express();

// إعدادات CORS
app.use(cors({
    origin: "https://barca-store.vercel.app",
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// الراوتر
app.use("/api/v1/users", UserRouter);

// التعامل مع المسارات غير الموجودة
app.all("*", (req, res) => {
    res.status(404).json({ status: "error", message: "this resource not available" });
});

// تصدير التطبيق كتصدير افتراضي
export default app;

// الاتصال بـ MongoDB (غير متزامن)
mongoose.connect(process.env.DATABASE, {
    dbName: "BarcaStore",
}).catch((err) => {
    console.error("MongoDB connection error:", err);
    // يمكنك إضافة منطق إضافي هنا للتعامل مع الأخطاء
});
