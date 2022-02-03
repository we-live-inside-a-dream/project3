const mongoose = require('./mongooseDb')

const EmployeeTimeOff = mongoose.model('employeeTimeOff', {
type: {
    type: [String],
    required: true,
},
startDate: {
    type: String,
    required: true,
},
endDate: {
    type: String,
    required: true,
},

startTime:{
    type: String,
},
endTime:{
    type: String,
},
allDay: {
    type: Boolean,
},
comment: {
    type: String,
},
status: {
    type: String,
    default: "pending"
}
})

async function createEmployeeTimeOff(employeeTimeOffData) {
    let newEmployeeTimeOff = new EmployeeTimeOff(employeeTimeOffData)
    let createEmployeeTimeOff = await newEmployeeTimeOff.save()
    console.log("saving Time OFF info", employeeTimeOffData);
    return createEmployeeTimeOff.id
} 

module.exports ={
    createEmployeeTimeOff
}