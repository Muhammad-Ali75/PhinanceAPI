const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    budgetId: { type: mongoose.Schema.ObjectId, ref: "Budget" },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
