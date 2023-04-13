require("dotenv").config();
const express = require("express");
const router = new express.Router();
const users = require("../models/UserSchema");
const key = process.env.key;

router.get("/", async (req, res) => {
  res.send("Space Explorer");
});

router.post("/addScore", async (req, res) => {
  try {
    if (req.body.key != key)
      return res.status(401).json({ error: "authentication error" });
    var username = req.body.username;
    var score = req.body.score;
    var uniqueId = req.body.uniqueId;
    let newScore = {
      uniqueId: uniqueId,
      username: username,
      score: score,
    };
    await users.updateOne({ uniqueId: uniqueId }, newScore, {
      upsert: true,
    });
    const topScores = await users.find().sort({ score: -1 }).limit(10);
    const isTopScore = topScores.some((user) => user.score <= score);
    let response = {
      msg: "new score added",
    };
    if (isTopScore) response.isTopScore = true;
    else response.isTopScore = false;

    res.json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "an error occurred while trying to add score" });
  }
});

router.get("/getLeaderboard/:key", async (req, res) => {
  try {
    if (req.params.key != key)
      return res.status(401).json({ error: "authentication error" });
    let scores = await users.find({}, { _id: 0 }).sort({ score: -1 }).limit(10);
    res.json({ entries: scores });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "an error occurred while trying to get leaderboard" });
  }
});

module.exports = router;
