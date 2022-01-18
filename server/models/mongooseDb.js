const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI

mongoose.connect(dbUrl, () => {console.log("Connected to mongo")});

console.log(dbUrl);

module.exports = mongoose;
