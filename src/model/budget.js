const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
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
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    expenses: [{ type: mongoose.Schema.ObjectId, ref: "Expense" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
