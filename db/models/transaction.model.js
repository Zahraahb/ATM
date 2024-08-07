import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const transactionModel = model("transaction", transactionSchema);
export default transactionModel;
