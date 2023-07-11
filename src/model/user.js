import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema(
  {
    email: {
      required: [true, "Email is required"],
      type: String,
      unique: true,
      lowercase: true,
    },
    name: {
      required: [true, "Name is required"],
      type: String,
      minLength: [3, "Name must be more than 3 characters long"],
    },
    password: {
      required: [true, "Password is required"],
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  //Validations
  if (!email || !password) {
    throw Error("Email and Password must be provided.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

userSchema.statics.signup = async function (email, password, name) {
  //Validations
  if (!email || !password || !name) {
    throw Error("Name, Email and Password must be provided.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }
  if (name.length < 3) {
    throw Error("Name must be at least 3 characters long.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, name, password: hash });

  return user;
};

export default model("User", userSchema);
