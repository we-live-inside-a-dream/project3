const mongoose = require('../../../../test/d2d/server/models/mongooseDb')

const User = mongoose.model('schedule', {
    name: String,
    phone: String,
    email: String,
})
