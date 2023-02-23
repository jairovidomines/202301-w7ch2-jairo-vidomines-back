import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  avatar: {
    type: Object,
  },
});

const User = model("User", userSchema, "users");

export default User;
