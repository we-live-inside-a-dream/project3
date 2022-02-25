const express = require("express");
const router = express.Router();
const employeeTimeOffModel = require("../models/businessDays");

router.post("/", async (req, res) => {
  let newBusinessDay = req.body;
  let createdId = await businessDaysModel.createBusinessDay(newBusinessDay);
  res.send(createdId);
});

router.post("/businessDays/:id", async (req, res) => { 
let id = req.params.id;
let updatedBusinessDay = req.body;
let businessDays = await businessDays.Model.updateBusinessDaysById(
  id,
  updatedBusinessDay
);
res.json(updatedBusinessDay);
});

router.get("/listBusinessDays", (req, res) => {
  businessDaysList = await businessDaysModel.listOfBusinessDays();
  res.json(businessDaysList);
});

// router.post("/updateBusinessDays", (req, res) => {
//     let id = req.query.id;
//     let updatedBusinessDay 
// })
