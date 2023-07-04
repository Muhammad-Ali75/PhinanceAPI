const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    budgetId: {
      type: mongoose.Schema.ObjectId,
      ref: "Budget",
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

expenseSchema.pre("validate", async function () {
  const Budget = require("./budget");
  const budget = await Budget.findById(this.budgetId);
  if (!budget) {
    throw new Error("Budget does not exist");
  }
});

expenseSchema.post("save", async function (doc) {
  const Budget = require("./budget");
  const budget = await Budget.findOne({ _id: doc.budgetId });
  budget.expenses.push(doc);
  await budget.save();
});

expenseSchema.post("findOneAndDelete", async function (doc) {
  const Budget = require("./budget");
  const budget = await Budget.findOne({ _id: doc.budgetId });
  budget.expenses = budget.expenses.filter(
    (expense) => expense._id.toString() !== doc._id.toString()
  );
  await budget.save();
});

module.exports = mongoose.model("Expense", expenseSchema);
