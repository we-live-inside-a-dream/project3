const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const path = require("path");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();


dotenv.config()
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB()
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

app.use("/api/schedule", scheduleRoutes); //
app.use("/", express.static("../client/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

mongoose.connect(process.env.connection_url || 'mongodb://localhost:27017/techConnect', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
