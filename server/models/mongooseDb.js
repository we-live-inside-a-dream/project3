const mongoose = require("mongoose");

require("dotenv").config("../.env");

const dbUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/c7Superheroes";

mongoose
  .connect(dbUrl, {
    useNewURLParser: true,
    useCreateIndex: true,
    useFindandModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

module.exports = mongoose;
