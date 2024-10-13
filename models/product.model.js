// tao model cho data base  .  
const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); 
mongoose.plugin(slug); 

// dinh dang cac truong muon lay ra trong database . 
const productSchema = new mongoose.Schema(
   {
   product_category_id : {
      type : String , 
      default : ""
   } ,  
   TenSanPham: String,
   nhaCungCap : String ,
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
   createBy : {
      account_id : String , 
      createAt : {
        type: Date , 
         default : Date.now 
      }
   },
   deleteBy : {
      account_id : String , 
      deleteAt : Date
   },
   hinhAnh: String,
   gia: Number,
   giam: Number, 
   status : String ,
   position : Number
}, {
   timestamps : true , 
}
);

// product ten hinh dat . 
// products : ten database .
const Product = mongoose.model('product', productSchema, "products");
module.exports = Product; 