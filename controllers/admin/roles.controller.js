const Roles = require("../../models/roles.model.js");

// [get] /admin/roles 
module.exports.index = async (req, res) => {
   let find = {
      deleted: false,
   }

   const roles = await Roles.find(find);


   res.render("admin/pages/roles/index.pug", {
      pageTitle: "Nhóm quyền",
      records: roles
   })
}

// [get] /admin/roles/create
module.exports.create = async (req, res) => {
   let find = {
      deleted: false,
   }
   const records = await Roles.find(find);

   res.render("admin/pages/roles/create.pug", {
      pageTitle: "Tạo nhóm quyền",
      records: records
   });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {

   try {
      const records = new Roles(req.body);
      await records.save();
      res.redirect("/admin/roles/create");
      req.flash("success" , "Tạo thành công") ; 
   } catch (error) {
      req.flash("success" , "Tạo thất bại") ;
   }
}

// [get] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
   try {
      const id = req.params.id;

      const find = {
         _id: id,
         deleted: false
      }
      const data = await Roles.findOne(find);
      res.render("admin/pages/roles/edit.pug", {
         pageTitle: "Trang chỉnh sửa nhóm quyền",
         data: data
      });
   } catch (error) {
   }
}

// [get] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
   try {
      const id = req.params.id;
      console.log(req.body);
      await Roles.updateOne({ _id: id }, req.body);
      req.flash("success", "Cập nhật thành công");
   } catch (error) {
      req.flash("error", "Cập nhật thất bại");
   }
   res.redirect("back");
}

// [get] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
   //lay ra nhom quyen roles . 
   let find = {
      deleted: false
   }

   const records = await Roles.find(find);

   res.render("admin/pages/roles/permissions.pug", {
      pageTitle: "Phân quyền",
      records: records
   });

}

// [get] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
   try {
      // chuyen tu json -> js JSON.pare()
      const permissions = JSON.parse(req.body.permissions);
      for (const item of permissions) {
         const id = item.id;
         const permissions1 = item.permissions;
         await Roles.updateOne({ _id: id }, { permissions: permissions1 });
      }
      req.flash("success" , "Cấp quyền thành công") ; 
   } catch (error) {
      req.flash("error" , "Cấp quyền thất bại");
   }
   res.redirect("/admin/roles/permissions");
}
