require("./connection");
const express = require("express");
const app = express();
const scores = require("./routers/scores");
const PORT = process.env.PORT || 3000;

app.use(express.json({ extended: true, limit: "5mb", parameterLimit: 100000 }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json());
app.use(scores);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
