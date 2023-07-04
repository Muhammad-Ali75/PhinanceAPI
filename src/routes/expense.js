const express = require("express");
const {
  getAll,
  getAllByBudget,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

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

module.exports = router;
