import { Types } from "mongoose";
import Expense from "../model/expense.js";

async function getAll(req, res) {
  const userId = req.user._id;

  const expenses = await Expense.find({ userId })
    .sort({ createdAt: -1 })
    .populate("budgetId");
  if (expenses.length === 0) {
    return res
      .status(404)
      .json({ success: false, error: "No expenses were found." });
  }
  res.json({ success: true, data: expenses });
}

async function getAllByBudget(req, res) {
  const userId = req.user._id;
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid budget id." });
  }

  const expenses = await Expense.find({ userId, budgetId: id })
    .sort({
      createdAt: -1,
    })
    .populate("budgetId");
  if (expenses.length === 0) {
    return res.status(404).json({ success: false, error: "No expense found." });
  }

  res.json({ success: false, data: expenses });
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
    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteExpense(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, error: "Invalid expense id." });
  }

  const expense = await Expense.findOneAndDelete({ _id: id });

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, error: "No such expense exists." });
  }

  res
    .status(202)
    .json({ success: true, message: "Expense deleted successfully." });
}

export { getAll, getAllByBudget, createExpense, deleteExpense };
