const express = require("express");
const {
  getCategory,
  getAllCategory,
  addCategory,
  deleteCategory,
} = require("../controllers/category-controller");

const router = express.Router();

router.get("/category/:id", getCategory);
router.get("/category", getAllCategory);
router.post("/category", addCategory);
router.delete("/category/:id", deleteCategory);


module.exports = {
    routes:router
}