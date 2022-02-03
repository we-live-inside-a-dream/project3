const express = require('express')
const router = express.Router()
const employeeTimeOffModel = require('../models/timeOff')


router.post('/', async (req, res) => {
    // console.log("Im here save me")
    let newEmployeeTimeOff = req.body
    let createdId = await employeeTimeOffModel.createEmployeeTimeOff(newEmployeeTimeOff)
    res.send(createdId)
})

module.exports = router