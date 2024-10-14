const Products = require("../../models/product.model.js"); 


module.exports.dashboard = async (req, res) => {
   let find = {
      hienThi : false , 
   }
   const products = await Products.find(find)
      .where("SoLuong").lt(10)
      .select(); 

   res.render("admin/pages/dashboard/index.pug", {
      pageTitle: "Trang tổng quan", 
      products : products
   });
}
