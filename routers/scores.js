const express = require("express");
const router = new express.Router();
const users = require("../models/UserSchema");

router.post("/addScore", async (req, res) => {
  try {
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

router.get("/getLeaderboard", async (req, res) => {
  try {
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
