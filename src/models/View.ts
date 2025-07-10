import mongoose, { Schema } from "mongoose";

const viewSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  couponId: { type: Schema.Types.ObjectId, ref: "Coupon", required: true },
});

viewSchema.index({ ip: 1, couponId: 1 }, { unique: true });

const View = mongoose.model("View", viewSchema);
export default View;
