const mongoose = require("mongoose");

const Position = mongoose.model("position", {
  value: String,
  label: String,
});

async function createPosition(Data) {
  let newPosition = new Position(Data);
  let createdPosition = await newPosition.save();
  console.log("FROM MODEL, new Position created", createdPosition);
  return createdPosition;
}

async function getPositions() {
<<<<<<< HEAD
  let allPositions = await Position.find({}).select([-"_id"]);
=======
  let allPositions = await Position.find({}).select(["-_id"]);
>>>>>>> 2111b68ebabd58f8f8311d429b26663ac0a063c1
  console.log("FROM MODEL, all positions", allPositions);
  return allPositions;
}

async function updatePosition(id, newData) {
  let updatedPosition = await Position.findByIdAndUpdate(id, newData, {
    returnDocument: "after",
  });
  console.log("UPDATED POSITON from the model", updatedPosition);
  return updatedPosition;
}

async function deletePosition(id) {
  let deletedPosition = await Position.findByIdAndDelete(id);
  console.log("from MODEL, deleted position", deletedPosition);
  return deletedPosition;
}

module.exports = {
  createPosition,
  getPositions,
  updatePosition,
  deletePosition,
};
