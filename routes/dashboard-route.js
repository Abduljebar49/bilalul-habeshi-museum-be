const express = require("express");
const { getDashboardCount } = require("../controllers/dashboard-controller");
const router = express.Router();

router.get('/dashboard',getDashboardCount);

module.exports = {
    routes: router,
  };