const mongoose = require('mongoose')

const dbUrl = process.env.MONGO_URL 
mongoose.connect(dbUrl)

module.exports = mongoose
