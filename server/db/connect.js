const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/Day2Day",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
};

module.exports = connectDB;
