const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;



const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/schedule", scheduleRoutes); //
app.use("/", express.static("../client/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const connectDB = (url) => {
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/Day2Day", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
};

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connection Established')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

