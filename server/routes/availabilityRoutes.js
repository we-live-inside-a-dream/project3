const express = require('express')
const router = express.Router()

const {
    createAvailability,
    updateAvailability,
    getAvailabilityByEmployeeProfileId,
    deleteAvailability,
} = require("../models/availability")

router.post("/createAvailability", async (req, res) => {
    let newAvailability = req.body;
    let availability = await createAvailability(newAvailability)
    if (!profile) res.status(500).send("failed to create");
    res.status(200).send(profile);
  });

