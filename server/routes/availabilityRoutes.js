const express = require("express");
const router = express.Router();

const {
  createAvailability,
  updateAvailability,
} = require("../models/availability");

router.post("/availability", async (req, res) => {
  let newAvailability = req.body;
  let availability = await createAvailability(newAvailability);
  if (!profile) res.status(500).send("failed to create");
  res.status(200).send(availability);
});

router.patch("/availability/:id", async (req, res) => {
  let id = req.params.id;
  let updatedAvailability = req.body;
  console.log("Updating availability", id, "with", updatedAvailability);
  let availability = await availabilityModel.update(id, updatedAvailability);
  updateAvailability(availability, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

router.get("/availability/:id", async (req, res) => {
  let availabilityList = await availabilityModel.listAvailabilities();
  res.send(availabilityList);
});

module.exports = router;