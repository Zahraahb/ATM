import jwt from "jsonwebtoken";
import userModel from "../../db/models/user.model.js";
import { AppError } from "../utils/classError.js";
import { asyncHandler } from "../utils/globalErrorHandler.js";

//fwye__ is what token starts with
export const auth = () => {
  return asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new AppError("token not exist!", 409));
     
    }
    if (!token.startsWith("fwye__")) {
      return next(new AppError("token not exist!", 409));
     
    }
    const newToken = token.split("fwye__")[1];
    if (!newToken) {
      return next(new AppError("token not exist!", 409));
     
    }
    const decoded = jwt.verify(newToken, "oyznr");
    if (!decoded.id) {
      return next(new AppError("invalid payload!", 409));
     
    }
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new AppError("invalid user", 409));
    
    }
    req.user = user;
    next();
  });
};
