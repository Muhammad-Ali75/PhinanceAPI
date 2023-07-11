import User from "../model/user.js";
import jwt from "jsonwebtoken";

//Create JWT
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

async function signUp(req, res) {
  const { email, password, name } = req.body;

  try {
    const user = await User.signup(email, password, name);
    const token = createToken(user._id);
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(202).json({ success: true, user, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export { signUp, logIn };
