// tao model cho data base  .  
const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); 

mongoose.plugin(slug); 

// dinh dang cac truong muon lay ra trong database . 
const productSchema = new mongoose.Schema({
   id : String , 
   product_category_id : {
      type : String , 
      default : ""
   } ,  
   TenSanPham: String,
   SoLuong: Number,
   slug : {
      type : String , 
      slug : "TenSanPham",
      unique : true// tao slug la duy nhat .
   },
   hienThi: {
      type : Boolean, 
      default :false, 
   },
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