import express from "express";
import mongoose from "mongoose";
import brandRouter from "./routes/brand";
import categoryRouter from "./routes/category";
import authRouter from "./routes/auth";
import couponRouter from "./routes/coupon";
import userRouter from "./routes/user";
import { insertFakeData } from "./utils/insertFakeData";
import Coupon from "./models/Coupon";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/brand", brandRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/coupon", couponRouter);
app.get("/api/home", async (req: any, res: any) => {
  try {
    const data: Record<string, any> = {};

    const coupons = await Coupon.find({}).populate({
      path: "brand",
      populate: {
        path: "category",
        model: "Category",
      },
    });

    coupons.forEach((coupon) => {
      if (!data[(coupon as any).brand.category.name])
        data[(coupon as any).brand.category.name] = [];
      data[(coupon as any).brand.category.name].push(coupon);
    });

    return res.json({ data });
  } catch (err) {
    console.log(err);

    return res.json({ err });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/coupons")
  .then(async () => {
    console.log("Connected to MongoDB");
    // await insertFakeData();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
