import { Schema, model } from "mongoose";

const couponSchema = new Schema({
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  price: { type: Number, required: true, min: 0 },
  terms_and_conditions: { type: String, required: true },
  type: { type: String, enum: ["deal", "code"], required: true },
  title: { type: String, required: true },
  code: { type: String, default: "" },
});

const Coupon = model("Coupon", couponSchema);
export default Coupon;
