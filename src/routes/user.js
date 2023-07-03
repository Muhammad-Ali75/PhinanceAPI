const express = require("express");
const { signUp, logIn } = require("../controllers/userController");
const router = express.Router();

router.get("/signup", signUp);

router.get("/login", logIn);

module.exports = router;
