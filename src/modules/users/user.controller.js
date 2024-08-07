import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/globalErrorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//================================register=================================
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return next(new AppError("user already exist!", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await userModel.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: newUser._id, email: newUser.email }, "oyznr", {
    expiresIn: "1h",
  });
  return res.status(201).json({
    message: "User registered successfully!",
    token,
  });
});

//================================login=================================
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("user not found!", 401));
  }

  const token = jwt.sign({ id: user._id }, "oyznr", { expiresIn: "1h" });
  return res.json({
    message: "User logged in successfully!",
    token,
  });
});



