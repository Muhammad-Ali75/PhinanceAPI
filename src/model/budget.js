import { Schema, model } from "mongoose";
import Expense from "../model/expense.js";

const budgetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    budgetedAmount: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    expenses: [
      {
        type: Schema.ObjectId,
        ref: "Expense",
      },
    ],
  },
  { timestamps: true }
);

budgetSchema.post("findOneAndDelete", async function (doc) {
  await Expense.deleteMany({ budgetId: doc._id.toString() });
});

export default model("Budget", budgetSchema);
