import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const accountModel = model("account", accountSchema);
export default accountModel;
