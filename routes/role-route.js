const express = require("express");

const {
  getUserRole,
  getAllUserRoles,
  addRole,
  deleteRole,
} = require("../controllers/role-controller");

const router = express.Router();

router.get("/role/:id", getUserRole);
router.get("/roles", getAllUserRoles);
router.post("/role", addRole);
router.delete("/role/:id", deleteRole);

module.exports = {
  routes: router,
};
