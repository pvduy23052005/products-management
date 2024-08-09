
const Product = require("../../models/product.model.js");

module.exports.product = async (req, res) => {
   const data = await Product.find({});
   console.log(data);

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
