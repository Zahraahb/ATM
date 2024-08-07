import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/globalErrorHandler.js";
import accountModel from "../../../db/models/account.model.js";
import transactionModel from "../../../db/models/transaction.model.js";


//=======================viewTransations================
export const viewTransactions = asyncHandler(async (req, res, next) => {
  const account = await accountModel.findOne({ user: req.user._id });
  if (!account) {
    return next(new AppError("account not found!", 409));
  }

  const transactions = await transactionModel
    .find({ account: account._id })
    .sort({ date: -1 });

  return res.json({ transactions });
});