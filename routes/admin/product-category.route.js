const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/product-category.controllers.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
const validate = require("../../validates/admin/product-category.validate.js");
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

// [POST] /admin/products/create 
router.post("/create",
   upload.single("hinhAnh"),
   uploadCloud.uploadCloud,
   controller.createPost
);

module.exports = router; 