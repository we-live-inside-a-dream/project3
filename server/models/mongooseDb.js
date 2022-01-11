const mongoose = require('mongoose')

const dbUrl = process.env.MONGO_URL || 'mongodb+srv://daedalus:icarus@project3daedalus.nzx15.mongodb.net/Project3Daedalus?retryWrites=true&w=majority'  //|| 'mongodb://localhost:27017/c7Superheroes'
mongoose.connect(dbUrl)

module.exports = mongoose
