import { Router } from "express";
import {
  getAll,
  getAllByBudget,
  createExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// require auth for all workout routes
router.use(requireAuth);

//get All expenses
router.get("/", getAll);

//get All expenses by budgetID
router.get("/:id", getAllByBudget);

// Create an expense
router.post("/create", createExpense);

//Delete an expense
router.delete("/:id", deleteExpense);

export default router;
