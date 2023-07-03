const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      Unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
