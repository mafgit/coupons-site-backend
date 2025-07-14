import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
    validate: [
      function (val: string) {
        return /^[a-zA-Z\. -']+$/.test(val);
      },
      "Invalid name",
    ],
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String, required: true, maxlength: 400 },
  website: {
    type: String,
    required: true,
    unique: true,
    match: /^https?:\/\/.+$/,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
    trim: true,
  },
  more_about: { type: String, default: "", maxlength: 1000, trim: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
    match: /^[a-z0-9-]+$/,
  },
  view_count: { type: Number, default: 0 },
  order: { type: Number, required: true, index: true },
});

const Brand = model("Brand", brandSchema);

export default Brand;
