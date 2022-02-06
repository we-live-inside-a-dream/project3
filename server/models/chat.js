const mongoose = require("./mongooseDb");

const Schedule = mongoose.model("schedule", {
recipients:[{
    id:String,
    name:String
}],
messages:[{
    sender:String,
    text,String,
    senderName:String,
    fromMe:Boolean
}],
selected:Boolean
  });

  async function findById(id) {
    return Schedule.findById(id);
  }

  async function update(id, newScheduleData) {
    return Schedule.findByIdAndUpdate(id, newScheduleData, {
      returnDocument: "after",
    });
  }

  module.exports = {
findById,
update
  };
  