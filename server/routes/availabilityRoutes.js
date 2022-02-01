const express = require("express");
const router = express.Router();

const availabilityModel = require("../models/availability");

// router.post("/availability-add", async (req, res) => {
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
// router.get("/availability-all", mustBeLoggedIn, async (req, res) => {
//   console.log("from AvailabilityRoutes");
//   let availabilityList =
//     await availabilityModel.listOfEmployeesAvailabilities();
//   console.log("List from Availability routes", availabilityList);
//   res.json(availabilityList);
//   const mustBeLoggedIn = async (req, res, next) => {
//     if (req.user) {
//       next();
//       return;
//     }
//   };
//   res.sendStatus(401);
// // });

// router.post("/availability", async (req, res) => {
//   let newAvailability = req.body;
//   let availability = await createAvailability(newAvailability);
//   if (!profile) res.status(500).send("failed to create");
//   res.status(200).send(availability);
// });
router.use("*", (req, res, next) => {
  console.log("AVAILABILITY ROUTER", req.originalUrl);
  next();
});
router.post("/availability/:id", async (req, res) => {
  let id = req.params.id;
  let updatedAvailability = req.body;
  console.log("Updating availability", id, "with", updatedAvailability);
  let availability = await availabilityModel.updateAvailabilityById(
    id,
    updatedAvailability
  );
  // updatedAvailability(availability, (updatedModel) => {
  //   res.status(200).send(updatedModel);
  // });
  res.json(availability);
});

router.get("/by-employee/:id", async (req, res) => {
  let id = req.params.id;
  let profile = await availabilityModel.getAvailabilityByEmployeeProfileId(id);
  console.log("THE PROFILE", profile);
  res.json(profile);
});

router.get("/availability-day/:id", async (req, res) => {
  let id = req.params.id;
  let profile = await availabilityModel.getAvailabilityById(id);
  res.json(profile);
});
router.post("/availability-update-maxhours/:id", async (req, res) => {
  let updatedAvailability = req.body;
  let id = req.params.id;

  let profile = await availabilityModel.updateAvailabilityById(
    id,
    updatedAvailability
  );
  console.log(id, "is the id");
  console.log("from availability API the updated availability is", profile);
  res.json(profile);
});
router.post("/availability-update-day/", async (req, res) => {
  let id = req.query.id;
  let updatedAvailability = req.body;
  console.log(
    "FROM API ROUTER THE ID AND UPDATED AVAILABILITY",
    id,
    updatedAvailability
  );
  let dayObject = await availabilityModel.updateAvailabilityById(
    id,
    updatedAvailability
  );
  console.log(id, "is the id");
  console.log("from availability API the updated availability is", dayObject);
  res.json(dayObject);
});

router.get("/availability-all", async (req, res) => {
  console.log("THIS IS FROM 101");
  let availabilityList =
    await availabilityModel.listOfEmployeesAvailabilities();
  console.log("Avail list...", availabilityList);
  res.json(availabilityList);
});

router.get(`/availibility/profile`, async (req, res) => {
  let id = req.query.id;
  let employeeAvailibility =
    await availabilityModel.getAvailabilityByEmployeeProfileId(id);
  console.log("employee Availibility...", employeeAvailibility);
  res.send(employeeAvailibility);
});

router.post("/availability-add", async (req, res) => {
  let newAvailability = req.body;
  let availability = await createAvailability(newAvailability);
  if (!profile) res.status(500).send("failed to create");
  res.status(200).send(availability);
});
module.exports = router;
