const express = require("express");
const {
  getAll,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

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

module.exports = router;
