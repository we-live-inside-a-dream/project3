const mongoose = require ('../config/mongooseDb')
let scheduleList = require('./scheduleList.json')

let scheduleModel = require('./schedule')

scheduleList.forEach(async (shift) => {
    console.log('Creating shift for', shift.name)
    let createdId = await scheduleModel.createSchedule(shift)
    console.log('... created with id', createdId)
})
