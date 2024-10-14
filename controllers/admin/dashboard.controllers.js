const Products = require("../../models/product.model.js"); 


module.exports.dashboard = async (req, res) => {
   let find = {
      deleted : false , 
   }
   const products = await Products.find(); 
   res.render("admin/pages/dashboard/index.pug", {
      pageTitle: "Trang tổng quan", 
      products : products
   });
}
