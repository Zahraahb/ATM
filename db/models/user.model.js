import { Schema, model } from "mongoose";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: 3,
      maxLength: 15,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email is required"],
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const userModel = model("user", userSchema);
export default userModel;
