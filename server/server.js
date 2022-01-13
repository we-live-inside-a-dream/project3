const express = require("express");

const path = require("path");
require("dotenv").config();
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();
const port = process.env.PORT || 5001;

app.use("/api/schedule", scheduleRoutes); //
app.use("/", express.static("../client/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
