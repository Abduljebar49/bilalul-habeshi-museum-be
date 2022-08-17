const express = require("express");
const {
  getCategory,
  getAllCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category-controller");

const router = express.Router();

router.get("/category/:id", getCategory);
router.patch("/category/:id", updateCategory);
router.get("/category", getAllCategory);
router.post("/category", addCategory);
router.delete("/category/:id", deleteCategory);

module.exports = {
  routes: router,
};
