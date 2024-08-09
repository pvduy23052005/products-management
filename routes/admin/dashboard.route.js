const express = require("express");
// tao ra cac route con ben trong . 
const router = express.Router();
// nhung controller vao . 
const controller = require("../../controllers/admin/dashboard.controllers.js");
router.get("/", controller.dashboard);  

module.exports = router; 