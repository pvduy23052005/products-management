const express = require("express"); 
const router =  express.Router(); 

const controller = require("../../controllers/admin/product.controllers.js"); 

router.get("/" , controller.product); 

// route cho thay doi 1  status product . 
// :status la data dong .  
// :id    la data dong . 
router.get("/change-status/:status/:id" , controller.changeStatus); 

// thay doi nhieu san pham . 
router.get("/change-multi", controller.changeMulti); 

router.get("/delete/:id" , controller.deleteItem); 

// [GET] 
router.get("/create" , controller.createGet); 

// [POST] 
router.post("/create" , controller.createPost) ; 

// xuat may cai route nay ra . 
module.exports = router ; 