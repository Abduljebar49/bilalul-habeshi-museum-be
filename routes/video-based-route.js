const express = require("express");
const { create, getAll, upload, getSingleData, deleteVideoBased } = require("../controllers/video-based-controller");

const router = express.Router();

router.post("/vb", upload.single("video"), create);
router.get("/vb/:id", getSingleData);
router.delete("/vb/:id", deleteVideoBased);
router.get("/vb", getAll);
// router.patch('/pb/:id',upload.single("image"),updateWithImage);
// router.patch('/pbwi/:id',update);

module.exports = {
  routes: router,
};
