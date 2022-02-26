const express = require("express");
const router = express.Router();
const businessDaysModel = require("../models/businessDays");

router.post("/", async (req, res) => {
  let newBusinessDay = req.body;
  let createdId = await businessDaysModel.createBusinessDay(newBusinessDay);
  res.send(createdId);
});

router.post("/update/:dayOfWeek", async (req, res) => {
let dayOfWeek = req.params.dayOfWeek;
let updatedBusinessDays = req.body;
let newBusinessDays = await businessDaysModel.updateBusinessDaysByDay(
  {dayOfTheWeek: dayOfWeek},
  updatedBusinessDays
);
res.json(newBusinessDays);
});

router.get("/list", async (req, res) => {
  businessDaysList = await businessDaysModel.listOfBusinessDays();
  res.json(businessDaysList);
});

router. delete("/delete/:dayOfWeek", async (req, res) => {
  let dayOfWeek = req.params.dayOfWeek;
  let deletedBusinessDays = await businessDaysModel.deleteBusinessDay({dayOfTheWeek: dayOfWeek});
  res.send(deletedBusinessDays);
})

module.exports = router;
