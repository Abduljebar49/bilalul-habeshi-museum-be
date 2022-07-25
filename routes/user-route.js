const { application } = require("express");
const express = require("express");
const {
  getUsers,
  login,
  authenticateToken,
  refreshToken,
  logout,
  addUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
// router.get("/users", authenticateToken, getUsers);
router.post("/login", login);
router.post("/token", refreshToken);
router.delete("/logout", logout);

module.exports = {
  routes: router,
};
