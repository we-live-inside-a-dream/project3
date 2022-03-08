const express = require("express");
const router = express.Router();
const permissionsModel = require("../models/permissions");

router.post("/create", async (req, res) => {
  let newPermissions = req.body;
  let createdPermissions = await permissionsModel.createPermissions(
    newPermissions
  );

  res.json(createdPermissions);
});

router.get("/get-all", async (req, res) => {
  let allPermissions = await permissionsModel.getPermissions();

  res.json(allPermissions);
});
router.get("/get-by-user-permissions", async (req, res) => {
  let userPermissions = req.query.permissions;

  let allPermissions = await permissionsModel.getPermissionsForUser(
    userPermissions
  );
  console.log(
    "FROM API permissions route, the permissions for this user: ",
    userPermissions,
    "are:",
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
