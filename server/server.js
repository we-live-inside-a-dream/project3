const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const scheduleRouter = require("./routes/scheduleRoutes");
const employeeProfileRouter = require("./routes/employeeProfileRoutes");
// const userRouter = require('./routes/userRoutes')
const connectDB = require("./db/connect");

const app = express();
const port = process.env.PORT || 5001;
dotenv.config();

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();

app.use("/api/schedule", scheduleRouter); //
app.use("/", express.static("../client/build"));

app.use("/employeeProfile", employeeProfileRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error: '))
// db.once('open', function () {
//   console.log('MongoDB database connection establish successfully.')
// })

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}...`);
// });
