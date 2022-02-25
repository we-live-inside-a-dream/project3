const express = require("express");
const router = express.Router();
const employeeTimeOffModel = require("../models/businessDays");

router.post("/", async (req, res) => {
  let newBusinessDay = req.body;
  let createdId = await businessDaysModel.createBusinessDay(newBusinessDay);
  res.send(createdId);
});

router.post("/update/:id", async (req, res) => { 
let id = req.params.id;
let updatedBusinessDays = req.body;
let businessDays = await businessDays.Model.updateBusinessDaysById(
  id,
  updatedBusinessDays
);
res.json(updatedBusinessDays);
});

router.get("/list", async (req, res) => {
  businessDaysList = await businessDaysModel.listOfBusinessDays();
  res.json(businessDaysList);
});

router. delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let deletedBusinessDays = await businessDaysModel.deletedBusinessDays(id);
  res.send(deletedBusinessDays);
})

module.exports = router;
