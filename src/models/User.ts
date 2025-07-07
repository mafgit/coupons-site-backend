import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  image: { type: String, default: "" },
});

const User = model("User", userSchema);
export default User;
