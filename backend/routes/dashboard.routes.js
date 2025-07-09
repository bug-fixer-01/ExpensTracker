const express = require("express");
const {protect} = require("../middleware/authmiddleware");
const {getDashboardData} = require("../controller/dashboard.Controller");

const router = express.Router();

router.get("/", protect, getDashboardData);

module.exports = router;