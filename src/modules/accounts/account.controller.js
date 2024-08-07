import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/globalErrorHandler.js";
import accountModel from "../../../db/models/account.model.js";
import transactionModel from "../../../db/models/transaction.model.js";

//=======================createAccount======================
export const createAccount = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new AppError("user not found!", 409));
  }

  const account = await accountModel.create({ user: req.user._id });
  return res
    .status(201)
    .json({ message: "Account created successfully!", account });
});
//=======================deposit=========================
export const deposit = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;
  const account = await accountModel.findOne({ user: req.user._id });
  if (!account) {
    return next(new AppError("account not found!", 409));
  }
  account.balance += amount;
  await account.save();
  await transactionModel.create({
    account: account._id,
    type: "deposit",
    amount,
  });

  return res.json({ message: "successful transaction!", account });
});

//==========================withdraw=========================
export const withdraw = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;
  const account = await accountModel.findOne({ user: req.user._id });
  if (!account) {
    return next(new AppError("account not found!", 409));
  }

  if (account.balance < amount) {
    return next(new AppError("your balance is less than transaction account!", 409));
  }

  account.balance -= amount;
  await account.save();
  await transactionModel.create({
    account: account._id,
    type: "withdraw",
    amount,
  });

  return res.json({ message: "successful transaction!", account });
});

//===========================getBalance========================
export const getBalance = asyncHandler(async (req, res, next) => {
  const account = await accountModel.findOne({ user: req.user._id });
  if (!account) {
    return next(new AppError("account not found!", 409));
  }

  return res.json({ message: "Account balance", balance: account.balance });
});
