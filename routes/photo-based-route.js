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
} = require("../controllers/photo-based-controller");

const router = express.Router();

router.post("/pb", upload.single("image"), create);
router.get("/pb/:id", getSingleData);
router.delete("/pb/:id", deletePhotoBased);
router.get("/pb", getAll);
router.patch('/pb/:id',upload.single("image"),updateWithImage);
router.patch('/pbwi/:id',update);
router.get('/pb-home/:num',getHomeCategoryList);
router.get('/pb-paginated',getPaginatedList);
router.get('/pb-search',searchCollection);
router.post('/pb-count/:id',addCount);


module.exports = {
  routes: router,
};
