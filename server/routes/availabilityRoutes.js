const express = require("express");
const router = express.Router();

const availabilityModel = require("../models/availability");

// router.post("/availability", async (req, res) => {
//   let newAvailability = req.body;
//   let availability = await createAvailability(newAvailability);
//   if (!profile) res.status(500).send("failed to create");
//   res.status(200).send(availability);
// });

// router.patch("/availability/:id", async (req, res) => {
//   let id = req.params.id;
//   let updatedAvailability = req.body;
//   console.log("Updating availability", id, "with", updatedAvailability);
//   let availability = await update(id, updatedAvailability);
//   updateAvailability(availability, (updatedModel) => {
//     res.status(200).send(updatedModel);
//   });
// });

// router.get("/availability/:id", async (req, res) => {
//   let availabilityList = await listAvailabilities();
//   res.send(availabilityList);
// });
router.get("/availability-all", async (req, res) => {
  console.log("from AvailabilityRoutes");
  let availabilityList =
    await availabilityModel.listOfEmployeesAvailabilities();
  console.log("List from Availability routes", availabilityList);
  res.json(availabilityList);
});
module.exports = router;
