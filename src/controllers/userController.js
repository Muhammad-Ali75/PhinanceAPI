const User = require("../model/user");
const jwt = require("jsonwebtoken");

//Create JWT
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

async function signUp(req, res) {
  const { email, password, name } = req.body;

  try {
    const user = await User.signup(email, password, name);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Method to post Product to db
async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  signUp,
  logIn,
};
