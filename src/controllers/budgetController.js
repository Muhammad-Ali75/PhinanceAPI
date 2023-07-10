import { Types } from "mongoose";
import Budget from "../model/budget.js";

async function getAll(req, res) {
  const userId = req.user._id;

  const budgets = await Budget.find({ userId })
    .sort({ createdAt: -1 })
    .populate("expenses");

  res.json(budgets);
}

async function getBudgetById(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such budget" });
  }

  const budget = await Budget.findOne({ _id: id, userId }).populate("expenses");

  if (!budget) {
    return res.status(404).json({ error: "No such budget" });
  }

  res.status(200).json(budget);
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
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
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
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateBudget(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such budget" });
  }

  const budget = await Budget.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!budget) {
    return res.status(400).json({ error: "No such budget" });
  }

  res.status(200).json(budget);
}

async function deleteBudget(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such budget" });
  }

  const budget = await Budget.findOneAndDelete({ _id: id });

  if (!budget) {
    return res.status(400).json({ error: "No such budget" });
  }

  res.status(200).json(budget);
}

export { getAll, getBudgetById, createBudget, updateBudget, deleteBudget };
