const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, required: true, default: "" },
    username: { type: String, required: true, default: "" },
    score: { type: Number, required: true, default: "" },
  },
  { versionKey: false }
);

const users = new mongoose.model("users", userSchema, "users");

module.exports = users;
