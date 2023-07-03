const express = require("express");
// const { signUp, logIn } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//get all budgets
router.get("/", (req, res) => {
  res.json({ msg: "ALL Budgets" });
});

//get budget by id
router.get("/:id", (req, res) => {
  res.json({ msg: `Budgets ${req.params.id}` });
});

//Create budget
router.post("/create", (req, res) => {
  res.json({ msg: `Create ` });
});

//Update budget
router.patch("/:id", (req, res) => {
  res.json({ msg: `Budgets ${req.params.id} updated` });
});

//Delete budget
router.delete("/:id", (req, res) => {
  res.json({ msg: `Budgets ${req.params.id} deleted` });
});

module.exports = router;
