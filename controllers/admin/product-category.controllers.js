const ProductCategory = require("../../models/product-category.model.js");


// [GET] /admin/product-category 
module.exports.index = async (req, res) => {
   let find = {
      hienThi: false,
   }
   let cnt = 0
   function createTree(arr, parentId = "") {
      // tao 1 mang tree ;
      const tree = [];
      arr.forEach((item) => {
         if (item.parent_id === parentId) {
            cnt++;
            const newItem = item;
            newItem.index = cnt;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
               newItem.children = children;
            }
            tree.push(newItem);
         }
      });
      return tree;
   }

   const records = await ProductCategory.find(find);
   const newRecords = createTree(records);

   console.log(newRecords); 

   res.render("admin/pages/product-category/index.pug", {
      pageTitle: "Trang danh mục sản phẩm ",
      records: newRecords, 
   });
}

// [GET] / admin/product-category/create
module.exports.create = async (req, res) => {
   let find = {
      hienThi: false,
   }
   let cnt = 0;
   function createTree(arr, parentId = "") {
      // tao 1 mang tree ;
      const tree = [];
      arr.forEach((item) => {
         if (item.parent_id === parentId) {
            ++cnt;
            const newItem = item;
            newItem.index = cnt;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
               newItem.children = children;
            }
            tree.push(newItem);
         }
      });
      return tree;
   }

   const records = await ProductCategory.find(find);
   const newRecords = createTree(records);

   res.render("admin/pages/product-category/create.pug", {
      pageTitle: "tạo danh mục sản phẩm ",
      records: newRecords
   });
}

// [POST] / admin/product-category/create
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
   }

   res.redirect("/admin/products-category");
}

// [get] / admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
   try{
      const id = req.params.id;
      const data1 = await ProductCategory.findOne({
         _id: id,
         hienThi: false
      });
      const records = await ProductCategory.find();
   
      res.render("admin/pages/product-category/edit.pug", {
         pageTitle: "Trang chinh sua danh muc san pham  ",
         data: data1,
         records: records
      });
   }catch( error) {
      res.redirect("/admin/products-category"); 
   }
}

// [PATCH] / admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
   const id = req.params.id

   req.body.position = parseInt(req.body.position);

   try {
      await ProductCategory.updateOne({ _id: id }, req.body)
      console.log("THANH CONG"); 
   } catch (error) {
      console.log("That bai"); 
   }
   res.redirect("back");
}