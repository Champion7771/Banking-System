const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const { getDashboard, getTrends } = require("../controllers/dashboard.controller");

router.get("/", protect, getDashboard);
router.get("/trends", protect, getTrends);

module.exports = router;