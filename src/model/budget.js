const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    budgetedAmount: {
      type: Number,
      required: true,
    },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    expenses: [{ type: mongoose.Schema.ObjectId, ref: "Expense" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
