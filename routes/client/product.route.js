// them thu vien express tao nhieu routes . 
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller.js");

// cac trang san pham con cua products 
router.get("/", controller.index);

router.get("/:slug" , controller.slug); 

// xuay ra .
module.exports = router; 