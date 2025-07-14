import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    validate: [
      function (val: string) {
        return /^[a-zA-Z\. -']+$/.test(val);
      },
      "Invalid name",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w\.]+@\w+(\.\w+){1,2}$/,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 50,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 100 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  image: { type: String, default: "" },
  order: { type: Number, required: true, index: true },
});

const User = model("User", userSchema);
export default User;
