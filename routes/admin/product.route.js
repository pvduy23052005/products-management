const express = require("express"); 
const multer = require("multer"); 
const router =  express.Router(); 
const upload = multer( {dest : "./public/uploads/"} );

const controller = require("../../controllers/admin/product.controllers.js"); 

router.get("/" , controller.product); 

// route cho thay doi 1  status product . 
// :status la data dong .  
// :id    la data dong . 
router.patch("/change-status/:status/:id" , controller.changeStatus); 

// thay doi nhieu san pham . 
router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id" , controller.deleteItem);

// [GET] /admin/products/create
router.get("/create" , controller.createGet);

// [POST] /admin/products/
router.post("/create" , upload.single("hinhAnh") ,controller.createPost); 
 

// xuat may cai route nay ra . 
module.exports = router ; 