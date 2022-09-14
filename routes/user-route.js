const { application } = require("express");
const express = require("express");
const {
  getUsers,
  login,
  authenticateToken,
  refreshToken,
  logout,
  addUser,
  getUser,
  deleteUser,
  update,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", update);
router.delete("/user/:id", deleteUser);
router.post("/user", addUser);
// router.get("/users", authenticateToken, getUsers);
router.post("/login", login);
router.post("/token", refreshToken);
router.delete("/logout", logout);


module.exports = {
  routes: router,
};
