const express = require("express");
const { upload } = require("../controllers/photo-based-controller");
const {
  getAll,
  create,
  getSingleData,
  update,
  deleteItem,
  updateStatus,
  getAllApproved,
} = require("../controllers/visitor-controller");


const router = express.Router();

router.get("/visitors", getAll);
router.post("/visitor",upload.single('image'), create);
router.get("/visitor/:id", getSingleData);
router.patch("/visitor/:id", update);
router.delete("/visitor/:id",deleteItem)
router.post("/v-approve/:id",updateStatus);
router.get("/v-approved",getAllApproved);

module.exports = {
  routes: router,
};
