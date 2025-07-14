import { Schema, model } from "mongoose";

const categorySchema = new Schema({
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
});

const Category = model("Category", categorySchema);
export default Category;
