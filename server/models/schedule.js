const mongoose = require('../../../../test/d2d/server/models/mongooseDb')

const Schedule = mongoose.model('schedule', {
    name: String,
    start: String,
    end: String,
})



async function createSchedule(ScheduleData) {
    let newSchedule = new Schedule(ScheduleData)
    let createdSchedule = await newSchedule.save()
    return createdSchedule.id
}

async function listSchedule() {
    return Schedule.find({})
}

async function findById(id) {
    return Schedule.findById(id)
}

async function update(id, newScheduleData) {
    return Schedule.findByIdAndUpdate(id, newScheduleData, {
        returnDocument: 'after',
    })
}

async function deleteSchedule(id) {
    return Schedule.findByIdAndDelete(id)
}

module.exports = {
    createSchedule,
    listSchedule,
    findById,
    update,
    deleteSchedule,
}
