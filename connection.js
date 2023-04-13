const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DB_URL = "mongodb://localhost:27017/SpaceExplorer";

mongoose.connect(DB_URL);
const connection = mongoose.createConnection(DB_URL);
exports.users = connection.model(
  "users",
  new Schema(
    {
      uniqueId: { type: String, required: true, default: "" },
      username: { type: String, required: true, default: "" },
      score: { type: Number, required: true, default: "" },
    },
    { versionKey: false }
  ),
  "users"
);

connection.once("open", function () {
  console.log("MongoDB connected successfully");
});

exports.module = connection;

//ssh -i "hasanifyec2.pem" ubuntu@ec2-3-84-212-70.compute-1.amazonaws.com
