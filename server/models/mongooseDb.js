const dotenv = require('dotenv')
dotenv.config()
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI || 

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
