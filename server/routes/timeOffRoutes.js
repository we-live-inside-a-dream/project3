const express = require('express')
const router = express.Router()
const employeeTimeOffModel = require('../models/timeOff')


router.post('/', async (req, res) => {
    let newEmployeeTimeOff = req.body
    let createdId = await employeeTimeOffModel.createEmployeeTimeOff(newEmployeeTimeOff)
    res.send(createdId)
    console.log("Im here save me", newEmployeeTimeOff)
})

module.exports = router