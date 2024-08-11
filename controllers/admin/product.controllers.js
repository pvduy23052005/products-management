
const product = require("../../models/product.model.js");
const helperListButton = require("../../helpers/listButton.js");
const helperSearch = require("../../helpers/search.js");
const helperPagination = require("../../helpers/pagination.js");

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

   // limit(n) : so hang de query
   // skip(n) :  so hang bo qua . 
   const data = await product.find(find)
      .sort({position : "desc"})
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);

   // ham de tra ve cac key cho file pug. 
   res.render("admin/pages/products/index.pug", {
      pageTitle: "Trang San pham ",
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
      req.flash("thanhCong" , "Cap nhat thanh cong ");  
      
      // khi click vao khong bi link sang trang khac .
      res.redirect("back");
   } catch (error) {
      console.error(error);
   }
}

// 
// /change-status/:status/:id : 
module.exports.changeMulti = async (req, res) => {
   const type = req.body.type
   const listId = req.body.ids.split(", ");
 
   switch (type) {
      case "active":
         await product.updateMany({ _id: { $in: listId } }, { status: "active" });
         req.flash("thanhCong" , `Cap nhat thanh cong ${listId.length} san pham`);  

         break;
      case "unactive":
         await product.updateMany({ _id: { $in: listId } }, { status: "inactive" });
         req.flash("thanhCong" , `Cap nhat thanh cong ${listId.length} san pham`);  

         break; 
      case "delete-all": // xoa 1 san pham . 
         await product.updateMany({ _id: { $in: listId } }, { hienThi: true });
                  req.flash("thanhCong" , `Xoa thanh cong ${listId.length} san pham`);  

         break ;
      case "change-position":// thay doi vi tri 
         // loc qua tung san pham . 
         for( const item of listId){
            
            const [id , position] = item.split("-"); 
            position1 = parseInt(position); 

            // update lai . 
            await product.updateOne({ _id : id } , { position : position1}); 
         }
         req.flash("thanhCong" , `Thanh Doi thanh cong ${listId.length} san pham`);  

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
   const id = req.params.id;
   // update lai hienThi . 
   await product.updateOne({ _id: id },{ hienThi: true });
   req.flash("thanhCong" , `Xoa thanh cong san pham`);  


   res.redirect("back");
}

//[GET] products/create
module.exports.createGet = ( req , res) => { 

   res.render("admin/pages/products/create.pug" , {
      pageTitle : "Trang them moi san pham " , 
   }); 
}

// [POST] products/create
module.exports.createPost = ( req , res) => { 
   console.log(req.body); 
   res.send("OK"); 
}