
const product = require("../../models/product.model.js");

module.exports.index = async (req, res) => {

   const find = {
      hienThi : false 
   }
   const data = await product.find(find).sort({position : "desc"});

   // tinh lai gia moi . 
   const newproduct = data.map((item) => { 
      item.giaMoi = (item.gia*(100 - item.giam)/100).toFixed(0); 
      return item ; 
   });


   res.render("client/pages/products/index.pug", {
      pageTitle: "Trang Danh sach San Pham ",
      product: newproduct
   });
}

// [get] /products/slug . 
module.exports.slug = async ( req, res) => { 
   try{
      // tao 1 ham tim . 
      const find = {
         hienThi : false , 
         slug : req.params.slug ,
         status : "active"
      }

      const product1 = await product.findOne(find); 
      // console.log(product1)

      res.render("client/pages/products/detail.pug" , {
         pageTitle : product1.TenSanPham, 
         product :  product1
      });
         
      
   }catch (error){

   }
}