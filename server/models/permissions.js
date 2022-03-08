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

let permissionChoices = [
  "scheduleView",
  "scheduleEdit",
  "employeeProfileView",
  "employeeProfileEdit",
  "employeeAvailabilityView",
  "employeeAvailabilityEdit",
  "shiftSwapView",
  "shiftSwapApprove",
  "employeeTimeOffView",
  "employeeTimeOffApprove",
  "appSettingsView",
  "appSettingsEdit",
];

async function createPermissions(Data) {
  let newPermissions = new Permissions(Data);
  let createdPermissions = await newPermissions.save();
  return createdPermissions;
}

async function getPermissions() {
  let allPermissions = await Permissions.findOne({});
  return allPermissions;
}
async function getPermissionsForUser(empPer) {
  console.log("FROM THE PERMISSIONS MODEL, THE EMPLOYEE PERMISSION IS", empPer);
  let employeePermission = empPer;
  let allPermissions = [];
  let permissions = await Permissions.findOne({});
  let thePermissions = permissionChoices.map((permission) => {
    if (permissions[permission].includes(employeePermission)) {
      return permission;
    } else {
      return null;
    }
  });

  //   let allPermissions = permissionChoices.map((p, index) => {
  //     if (permissions[p].includes(empPer)) {
  //       return { [p]: true };
  //     } else {
  //       return { [p]: false };
  //     }
  //   });

  console.log("FROM MODEL, getting permissions list", allPermissions);
  return thePermissions;
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
  getPermissionsForUser,
};
