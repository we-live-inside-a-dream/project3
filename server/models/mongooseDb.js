const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path')
 
dotenv.config({path:path.join(__dirname,'../.env')});
console.log(__dirname)
const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl, () => {
  console.log("Connected to mongoDB");
});


module.exports = mongoose;
