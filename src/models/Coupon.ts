import { Schema, model } from "mongoose";

const couponSchema = new Schema({
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  price: { type: Number, required: true, min: 0 },
  terms_and_conditions: { type: String, required: true },
  type: { type: String, enum: ["deal", "code"], required: true },
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
    trim: true
  },
  code: {
    type: String,
    default: "",
    minlength: 5,
    required: function () {
      return (this as any).type === "code";
    },
  },
  verified: { type: Boolean, default: false },
  view_count: { type: Number, default: 0 },
  order: { type: Number, required: true, index: true },
});

const Coupon = model("Coupon", couponSchema);
export default Coupon;
