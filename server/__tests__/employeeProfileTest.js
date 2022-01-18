const mongoose = require ('../config/mongooseDb')

const scheduleModel = require('../models/schedule')

describe('EmployeeProfile model', ()=>{
    // setup
    // execute
    let employeeProfile = await createEmployeeProfile({
        firstName: "Brian",
        lastName: "Sauco",
});
    // verify
    let findEmployee = await employeeProfileModel.findOne({employeeProfile})
    expect(findEmployee).toBe('Brian', 'Sauco')
    console.log(findEmployee, 'Find Employee')
    console.log(employeeProfile, 'Employee Profile')
})