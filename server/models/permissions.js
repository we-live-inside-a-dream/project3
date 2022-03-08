const mongoose = require("mongoose");

const Permissions = mongoose.model("permissions", {
  scheduleView: [String],
  scheduleEdit: [String],
  employeeProfileView: [String],
  employeeProfileEdit: [String],
  employeeAvailabilityView: [String],
  employeeAvailabilityEdit: [String],
  shiftSwapView: [String],
  shiftSwapApprove: [String],
  employeeTimeOffView: [String],
  employeeTimeOffApprove: [String],
  appSettingsView: [String],
  appSettingsEdit: [String],
});

async function createPermissions(Data) {
  let newPermissions = new Permissions(Data);
  let createdPermissions = await newPermissions.save();
  console.log("FROM MODEL, the permissions are ", createdPermissions);
  return createdPermissions;
}

async function getPermissions() {
  let allPermissions = await Permissions.findOne({});
  console.log("FROM MODEL, getting permissions list", allPermissions);
  return allPermissions;
}

async function updatePermissions(id, newData) {
  let updatedPermissions = await Permissions.findByIdAndUpdate(id, newData, {
    returnDocument: "after",
  });
  console.log("UPDATED PERMISSIONS from the model", updatedPermissions);
  return updatedPermissions;
}

module.exports = {
  createPermissions,
  getPermissions,
  updatePermissions,
};
