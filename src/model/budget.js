import { Schema, model } from "mongoose";
import Expense from "../model/expense.js";

const budgetSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Budget title is required"],
      minLength: [3, "Budget title must be at least 3 characters long."],
    },
    budgetedAmount: {
      type: Number,
      required: [true, "Budget amount is required"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
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

budgetSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Expense.deleteMany({ budgetId: doc._id.toString() });
  }
  next();
});

export default model("Budget", budgetSchema);
