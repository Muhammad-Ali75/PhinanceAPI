import { Router } from "express";
import {
  getAll,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// require auth for all workout routes
router.use(requireAuth);

//get all budgets
router.get("/", getAll);

//get budget by id
router.get("/:id", getBudgetById);

//Create budget
router.post("/create", createBudget);

//Update budget
router.patch("/:id", updateBudget);

//Delete budget
router.delete("/:id", deleteBudget);

export default router;
