const express = require("express");
const router = express.Router();
const permissionsModel = require("../models/permissions");

router.post("/create", async (req, res) => {
  let newPermissions = req.body;
  console.log("FORM THE API THIS IS THE BODY SENT", newPermissions);
  let createdPermissions = await permissionsModel.createPermissions(
    newPermissions
  );
  console.log(
    "From API permissions route created permissions:",
    createdPermissions
  );
  res.json(createdPermissions);
});

router.get("/get-all", async (req, res) => {
  let allPermissions = await permissionsModel.getPermissions();
  console.log(
    "FROM API permissions route, all permissions are:",
    allPermissions
  );
  res.json(allPermissions);
});
router.get("/get-by-user-permissions", async (req, res) => {
  let userPermissions = req.query.permissions;
  console.log(
    "FROM THE AAAAPPPPIIII the employee permissions are",
    userPermissions
  );
  let allPermissions = await permissionsModel.getPermissionsForUser(
    userPermissions
  );
  console.log(
    "FROM API permissions route, the permissions for this user are:",
    allPermissions
  );
  res.json(allPermissions);
});

router.post("/update", async (req, res) => {
  let id = req.query.id;
  let permissionsData = req.body;
  console.log(
    "from API before update, id and newData are:",
    id,
    permissionsData
  );
  let updatedPermissions = await permissionsModel.updatePermissions(
    id,
    permissionsData
  );
  console.log(
    "FROM API update permissions, updatedPermissions",
    updatedPermissions
  );
  res.json(updatedPermissions);
});

module.exports = router;
