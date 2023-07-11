import { Types } from "mongoose";
import Budget from "../model/budget.js";

async function getAll(req, res) {
  const userId = req.user._id;

  const budgets = await Budget.find({ userId })
    .sort({ createdAt: -1 })
    .populate("expenses");
  if (budgets.length === 0) {
    return res.status(404).json({ success: false, error: "No budget found" });
  }
  res.json({ success: true, data: budgets });
}

async function getBudgetById(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, error: "Invalid budget id." });
  }

  const budget = await Budget.findOne({ _id: id, userId }).populate("expenses");

  if (!budget) {
    return res.status(404).json({ success: false, error: "No such budget" });
  }

  res.status(200).json({ success: true, data: budget });
}

async function createBudget(req, res) {
  const { title, budgetedAmount, color } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!budgetedAmount) {
    emptyFields.push("budgetedAmount");
  }
  if (!color) {
    emptyFields.push("color");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  // add doc to db
  try {
    const userId = req.user._id;
    const budget = await Budget.create({
      title,
      budgetedAmount,
      color,
      userId,
    });
    res.status(201).json({ success: true, data: budget });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function updateBudget(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid budget id." });
  }

  const budget = await Budget.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!budget) {
    return res
      .status(404)
      .json({ success: false, error: "No such budget exists." });
  }

  res
    .status(200)
    .json({ success: true, message: "Budget updated successfully." });
}

async function deleteBudget(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid budget id." });
  }

  const budget = await Budget.findOneAndDelete({ _id: id });

  if (!budget) {
    return res
      .status(404)
      .json({ success: false, error: "No such budget exists." });
  }

  res
    .status(202)
    .json({ success: true, message: "Budget deleted successfully." });
}

export { getAll, getBudgetById, createBudget, updateBudget, deleteBudget };
