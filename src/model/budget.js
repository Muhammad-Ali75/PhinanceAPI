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
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    expenses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Expense",
      },
    ],
  },
  { timestamps: true }
);

budgetSchema.post("findOneAndDelete", async function (doc) {
  const Expense = require("../model/expense");
  await Expense.deleteMany({ budgetId: doc._id.toString() });
});

module.exports = mongoose.model("Budget", budgetSchema);
