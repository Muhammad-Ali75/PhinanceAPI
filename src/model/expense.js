import { Schema, model } from "mongoose";
import Budget from "./budget.js";

const expenseSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Expense title is required"],
      minLength: [3, "Expense must be at least 3 characters long"],
    },
    expenseAmount: {
      type: Number,
      required: [true, "Expense amount is required"],
    },
    budgetId: {
      type: Schema.ObjectId,
      ref: "Budget",
      required: [true, "Budget Id is required"],
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
  },
  { timestamps: true }
);

expenseSchema.pre("validate", async function () {
  const budget = await Budget.findById(this.budgetId);
  if (!budget) {
    throw new Error("Budget does not exist");
  }
});

expenseSchema.post("save", async function (doc) {
  const budget = await Budget.findOne({ _id: doc.budgetId });
  budget.expenses.push(doc);
  await budget.save();
});

expenseSchema.post("findOneAndDelete", async function (doc) {
  const budget = await Budget.findOne({ _id: doc.budgetId });
  budget.expenses = budget.expenses.filter(
    (expense) => expense._id.toString() !== doc._id.toString()
  );

  await budget.save();
});

export default model("Expense", expenseSchema);
