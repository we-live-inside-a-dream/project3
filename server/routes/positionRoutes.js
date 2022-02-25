const express = require("express");
const router = express.Router();
const positionModel = require("../models/positions");

router.post("/create", async (req, res) => {
  let newPosition = req.body;
  let createdPosition = await positionModel.createPosition(newPosition);
  console.log("From API position route created position Id:", createdPosition);
  res.json(createdPosition);
});

router.get("/get-all", async (req, res) => {
  let allPositions = await positionModel.getPositions();
  console.log("FROM API positions route, all positions are:", allPositions);
  res.json(allPositions);
});

router.post("/update", async (req, res) => {
  let id = req.query.id;
  let positionData = req.body;
  console.log("from API before update, id and newData are:", id, positionData);
  let updatedPosition = await positionModel.updatePosition(id, positionData);
  console.log("FROM API update position, updatedPosition:", updatedPosition);
  res.json(updatedPosition);
});

router.delete("/delete ", async (req, res) => {
  let id = req.query.id;
  let deletedPosition = await positionModel.deletePosition();
  console.log("from API POSITION, id to delete is ", id);
  res.send(deletedPosition);
});
module.exports = router;
