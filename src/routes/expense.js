const express = require("express");
// const { signUp, logIn } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//get All expenses
router.get("/", (req, res) => {
  res.json({ msg: "ALL Expense" });
});

// Create an expense
router.post("/create", (req, res) => {
  res.json({ msg: `Create Expense ` });
});

//Delete an expense
router.delete("/:id", (req, res) => {
  res.json({ msg: `Expense ${req.params.id} deleted` });
});

module.exports = router;
