import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  planId: { type: String, required: true },
  credits: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  createdAt: { type: Date, default: Date.now },
});

const transactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export default transactionModel;
