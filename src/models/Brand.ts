import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String, required: true },
  website: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  view_count: { type: Number, default: 0 },
});

const Brand = model("Brand", brandSchema);

export default Brand;
