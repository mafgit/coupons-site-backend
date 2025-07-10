import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
  number: { type: Number, required: true, min: 1, max: 5 },
  ip: { type: String, required: true },
  brandId: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
});

const Rating = model("Rating", ratingSchema);
export default Rating;
