const express = require("express");
const {
  getAll,
  create,
  getSingleData,
  update,
  deleteItem,
  updateStatus,
  getAllApproved,
} = require("../controllers/donate-item-controller");

const router = express.Router();

router.get("/donaters", getAll);
router.post("/donater", create);
router.get("/donater/:id", getSingleData);
router.patch("/donater/:id", update);
router.delete("/donater/:id",deleteItem);
router.post("/d-approve/:id",updateStatus);
router.get("/d-approved",getAllApproved);

module.exports = {
  routes: router,
};