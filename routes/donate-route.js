const express = require("express");
const {
  getAll,
  create,
  getSingleData,
  update,
} = require("../controllers/donate-item-controller");

const router = express.Router();

router.get("/donaters", getAll);
router.post("/donater", create);
router.get("/donater/:id", getSingleData);
router.patch("/donater/:id", update);

module.exports = {
  routes: router,
};
