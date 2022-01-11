const express = require("express");

const path = require("path");
require("dotenv").config();

// const D2dRoutes = require('./routes/D2dRoutes')

const app = express();
const port = process.env.PORT || 5001;

// app.use('/api',D2dRoutes)//
app.use("/", express.static("../client/build"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
