// them thu vien express tao nhieu routes . 
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/client/product.controller.js");

// cac trang san pham con cua products 
router.get("/", productController.product);

// xuay ra .
module.exports = router; 