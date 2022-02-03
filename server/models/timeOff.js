const mongoose = require('./mongooseDb')

const EmployeeTimeOff = mongoose.model('employeeTimeOff', {
type: {
    type: [String],
    required: true,
},
start: {
    type: String,
},
end: {
    type: String,
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
    return createEmployeeTimeOff.id
} 

module.exports ={
    createEmployeeTimeOff
}