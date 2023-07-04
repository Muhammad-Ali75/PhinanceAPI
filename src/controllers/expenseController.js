const mongoose = require("mongoose");
const Expense = require("../model/expense");
const Budget = require("../model/budget");

async function getAll(req, res) {
  const userId = req.user._id;

  const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });

  res.json(expenses);
}

async function getAllByBudget(req, res) {
  const userId = req.user._id;
  const { id } = req.params;

  const expenses = await Expense.find({ userId, budgetId: id }).sort({
    createdAt: -1,
  });

  res.json(expenses);
}

async function createExpense(req, res) {
  const { title, expenseAmount, budgetId } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!expenseAmount) {
    emptyFields.push("expenseAmount");
  }
  if (!budgetId) {
    return res.status(400).json({ error: "Budget ID is required" });
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const userId = req.user._id;
    const expense = await Expense.create({
      title,
      expenseAmount,
      budgetId,
      userId,
    });
    res.status(200).json({ success: true, expense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteExpense(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such expense" });
  }

  const expense = await Expense.findOneAndDelete({ _id: id });

  if (!expense) {
    return res.status(400).json({ error: "No such expense" });
  }

  res.status(200).json(expense);
}

module.exports = {
  getAll,
  getAllByBudget,
  createExpense,
  deleteExpense,
};
