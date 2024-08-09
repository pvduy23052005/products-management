// tao model cho data base  .  
const mongoose = require("mongoose");

// dinh dang cac truong muon lay ra trong database . 
const productSchema = new mongoose.Schema({
   id : String , 
   TenSanPham: String,
   SoLuong: Number,
   hienThi: Boolean,
   hinhAnh: String,
   gia: Number,
   giam: Number, 
   status : String ,
   position : Number
});

// product ten hinh dat . 
// products : ten database .
const Product = mongoose.model('product', productSchema, "products");
module.exports = Product; 