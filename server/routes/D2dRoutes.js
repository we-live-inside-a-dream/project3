const express = require('express')
const router = express.Router()

const scheduleModel = require('../models/schedule')

router.get('/schedule', async (req, res) => {
    let scheduleList = await scheduleModel.listSchedule()
    res.send(scheduleList)
})

router.post('/schedule', async (req, res) => {
    let newSchedule = req.body
    let createdId = await scheduleModel.createSchedule(newSchedule)
    res.send(createdId)
})

module.exports = router
