const express = require("express");
const multer = require("multer");
// nhung file  uload anh .  
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js"); 
const router = express.Router();
const controller = require("../../controllers/admin/product.controllers.js");
const validate = require("../../validates/admin/product.validate.js");
const upload = multer();

 
router.get("/", controller.product);

// route cho thay doi 1  status product . 
// :status la data dong .  
// :id    la data dong . 
router.patch("/change-status/:status/:id", controller.changeStatus);

// thay doi nhieu san pham . 
router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

// [GET] /admin/products/create
router.get("/create", controller.createGet);

// [POST] /admin/products/create 
router.post("/create",
   upload.single("hinhAnh"),
   uploadCloud.uploadCloud,
   validate.createPost,
   controller.createPost
);

// params : truong chuyen data dong . 
// query  : truong sau dau ? 
router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
   upload.single("hinhAnh"),
   uploadCloud.uploadCloud,
   validate.createPost,
   controller.editPatch
);

router.get("/detail/:id", controller.detail);


// xuat may cai route nay ra . 
module.exports = router;


