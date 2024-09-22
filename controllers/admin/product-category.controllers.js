const ProductCategory = require("../../models/product-category.model.js");



// [GET] /admin/product-category 
module.exports.index = async (req, res) => {
   let find = {
      hienThi : false , 
   }

   const records = await ProductCategory.find(find); 

   console.log(records); 

   res.render("admin/pages/product-category/index.pug", {
      pageTitle: "Trang danh mục sản phẩm ",
      records : records
   });
}

// [GET] / admin/product-category/create
module.exports.create = async (req, res) => {
   res.render("admin/pages/product-category/create.pug", {
      pageTitle: "tạo danh mục sản phẩm "
   });
}

module.exports.createPost = async (req, res) => {
   if (req.body.position == "") {
      req.body.position = await ProductCategory.countDocuments() + 1;
   }
   else {
      req.body.position = parseInt(req.body.position);
   }

   try {
      const record = new ProductCategory(req.body);
      await record.save();

      console.log("THANH CONG");
   } catch (error) {
      console.log("THAT BAI")
      console.error(error); 
   }

   // const existingCategories = await ProductCategory.find({ hienThi: false });
   // console.log(existingCategories);
}