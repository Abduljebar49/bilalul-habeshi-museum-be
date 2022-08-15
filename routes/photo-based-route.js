const express = require("express");
const {
  create,
  upload,
  getAll,
  getSingleData,
  deletePhotoBased,
} = require("../controllers/photo-based-controller");

const router = express.Router();

router.post("/pb", upload.single("image"), create);
router.get("/pb/:id", getSingleData);
router.delete("/pb/:id", deletePhotoBased);
router.get("/pb", getAll);
module.exports = {
  routes: router,
};
