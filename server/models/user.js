const mongoose = require('./mongooseDb')

const User = mongoose.model('schedule', {
    name: String,
    phone: String,
    email: String,
})
