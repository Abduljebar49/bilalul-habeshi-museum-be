const express = require("express");
const {
  create,
  upload,
  getAll,
  getSingleData,
  deletePhotoBased,
  update,
  updateWithImage,
  getHomeCategoryList,
  getPaginatedList,
  searchCollection,
  addCount,
  createWithOnlyImage,
  updateWithAudio,
} = require("../controllers/photo-based-controller");

const router = express.Router();

router.post(
  "/pb",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "audio",
      maxCount: 1,
    },
  ]),
  create
);
router.get("/pb/:id", getSingleData);
router.delete("/pb/:id", deletePhotoBased);
router.get("/pb", getAll);
router.patch(
  "/pb/:id",
  upload.single('image'),
  //  uploadAudio,
  updateWithImage
);
router.patch("/pbwi/:id", update);
router.get("/pb-home/:num", getHomeCategoryList);
router.get("/pb-paginated", getPaginatedList);
router.get("/pb-search", searchCollection);
router.post("/pb-count/:id", addCount);
router.post("/pb-wi",upload.single('image'),createWithOnlyImage)
router.patch("/pb-ua/:id",upload.single('audio'),updateWithAudio)

module.exports = {
  routes: router,
};
