
const product = require("../../models/product.model.js");
const helperListButton = require("../../helpers/listButton.js");
const helperSearch = require("../../helpers/search.js");
const helperPagination = require("../../helpers/pagination.js");
const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-category.model.js");
const createTreeHelper = require("../../helpers/createTree.js") ; 

// phuogn thuc {GET} /product . 
module.exports.product = async (req, res) => {

   // goi den su ly bo loc . 
   const listButton = helperListButton(req.query);

   //goi den  phan tim kiem . 
   // let find = helperFind(req.query); 
   const search = helperSearch(req.query);

   let find = {
      hienThi: false
   };
   // status khac rong . 
   if (req.query.status) {
      find.status = req.query.status;
   }

   if (search.TenSanPham) {
      find.TenSanPham = search.TenSanPham
   }

   // PAGINATION . 
   // tim so luong ban ghi trong database . 
   const countProduct = await product.countDocuments(find);

   let objectPagination = helperPagination(
      {
         currentPase: 1,
         limitItems: 4
      },
      req.query,
      countProduct
   )


   let sort = {}
   if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
   } else {
      sort.position = "desc";
   }


   // limit(n) : so hang de query
   // skip(n) :  so hang bo qua . 
   const data = await product.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);

   // ham de tra ve cac key cho file pug. 
   res.render("admin/pages/products/index.pug", {
      pageTitle: "Trang sản phẩm",
      product: data,
      listbutton: listButton,
      keyword: search.keyword,
      pagination: objectPagination
   });
}

// THAY DOI TRANG THAI 1 SAN PHAM . 
//admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
   // lay ve status . on url 
   const status = req.params.status;
   //lay ve id on url . 
   const id = req.params.id;
   try {
      const result = await product.updateOne({ _id: id }, { status: status });

      // nModified : 1 thuoc tinh cua updateOne != 0 la product da update . 
      if (result.nModified === 0) {
         return res.status(404).send('Sản phẩm không tìm thấy');
      }
      // hien thi ra thong bao .        
      req.flash("success", "Thay đổi thành công");

      // khi click vao khong bi link sang trang khac .
      res.redirect("back");
   } catch (error) {
      req.flash("error", "Thay đổi thất bại");
   }
}

// 
// /change-status/:status/:id: 
module.exports.changeMulti = async (req, res) => {
   const type = req.body.type
   const listId = req.body.ids.split(", ");

   switch (type) {
      case "active":
         try {
            await product.updateMany({ _id: { $in: listId } }, { status: "active" });
            req.flash("success", `Cập nhật thành công`);
         } catch (error) {
            req.flash("error", "Thất bại");
         }
         break;
      case "inactive":
         try {
            await product.updateMany({ _id: { $in: listId } }, { status: "inactive" });
            req.flash("success", `Cập nhật thành công`);
         } catch (error) {
            req.flash("error", "Thất bại");
         }

         break;
      case "delete-all": // xoa 1 san pham . 
         try {
            await product.updateMany({ _id: { $in: listId } }, { hienThi: true });
            req.flash("success", `Xóa thành công`);
         } catch (error) {
            req.flash("error", "Thất bại");
         }

         break;
      case "change-position":// thay doi vi tri 
         // loc qua tung san pham . 
         for (const item of listId) {

            const [id, position] = item.split("-");
            position1 = parseInt(position);

            // update lai . 
            await product.updateOne({ _id: id }, { position: position1 });
         }
         req.flash("success", `Thay đổi thành công`);

         break;
      default:
         break;
   }
   // quay lai trang truoc do . 
   res.redirect("back");
}

// XOA 1 SAN PHAM . 
// : /admin/products/delete/:id 
module.exports.deleteItem = async (req, res) => {
   try {
      const id = req.params.id;
      // update lai hienThi . 
      await product.updateOne({ _id: id }, { hienThi: true });
      req.flash("success", `Xóa thành công`);
   } catch (error) {
      req.flash("error", `Xóa không thành công`);
   }

   res.redirect("back");
}

//[GET] products/create
module.exports.createGet = async (req, res) => {
   let find = {
      deleted: false,
   }
   const records = await ProductCategory.find(find);
   const newRecords = createTreeHelper.tree(records) ; 
   res.render("admin/pages/products/create.pug", {
      pageTitle: "Thêm mới sản phẩm",
      records: newRecords 
   });
}

// [POST] products/create  
module.exports.createPost = async (req, res) => {
   // neu TenSanPham

   req.body.gia = parseInt(req.body.gia);
   req.body.giam = parseInt(req.body.giam);
   req.body.soLuong = parseInt(req.body.soLuong);
   // nhap position . 
   if (req.body.position == "") {
      req.body.position = await product.countDocuments() + 1;
   }
   else {
      req.body.position = parseInt(req.body.position);
   }

   try {
      //tao 1 san pham moi . 
      const product = new Product(req.body);
      await product.save();
      req.flash("success", "Tạo thành công");
   } catch {
      req.flash("error", "Tạo thất bại ");
   }
   res.redirect("/admin/products");
}

// [GET] /admin/products/edit/:id 
module.exports.edit = async (req, res) => {
   try {
      let find = {
         hienThi: false,
         _id: req.params.id
      }
      const product1 = await product.findOne(find);
      const records = await ProductCategory.find({ hienThi: false });
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
      const newRecords = createTree(records);
      res.render("admin/pages/products/edit.pug", {
         pageTitle: "Chỉnh sửa sản phẩm",
         product: product1,
         category: newRecords,

      });
   } catch (error) {// neu that bai tran g
      res.redirect("/admin/products");
   }
}

// [patch] /admin/products/edit/:id/
module.exports.editPatch = async (req, res) => {

   req.body.gia = parseInt(req.body.gia);
   req.body.giam = parseInt(req.body.giam);
   req.body.soLuong = parseInt(req.body.soLuong);
   req.body.position = parseInt(req.body.position);

   try {
      await product.updateOne({ _id: req.params.id }, req.body);
      req.flash("success", "Chỉnh sửa thành công");
   } catch (error) {
      req.flash("error", "Sửa thất bại");
   }
   res.redirect("back");
}

// [GET] /admin/products/detail/:id 
//  Chi tiet sua san pham . 
module.exports.detail = async (req, res) => {
   try {
      let find = {
         hienThi: false,
         _id: req.params.id
      }
      const product1 = await product.findOne(find);
      res.render("admin/pages/products/detail.pug", {
         pageTitle: product1.TenSanPham,
         product: product1
      });
   } catch (error) {
      res.redirect("/admin/products");
   }
}
