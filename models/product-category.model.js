// tao model cho data base  .  
const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); 
mongoose.plugin(slug); 

// dinh dang cac truong muon lay ra trong database . 
const productCategorySchema = new mongoose.Schema(
   {
      title: String,
      parent_id : {
         type : String , 
         default : ""
      }, 
      description : String , 
      hinhAnh: String,
      status : String ,
      position : Number,
      slug : {
         type : String , 
         slug : "title",
         unique : true 
      },
      deleted :{
         type : Boolean , 
         default : false ,
      },
      deletedAt : Date 
   },
   {
      timestamps : true ,
   }
);

// product ten hinh dat . 
// products : ten database .
const productCategory = mongoose.model('productCategory', productCategorySchema, "products-category");
module.exports = productCategory;