const User = require("../model/user");

async function signUp(req, res) {
  res.send("USER signUP{");
}

//Method to post Product to db
async function logIn(req, res) {
  res.send("USER LOGIN");
}

module.exports = {
  signUp,
  logIn,
};
