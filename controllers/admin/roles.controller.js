const Roles = require("../../models/roles.model.js");

// [get] /admin/roles 
module.exports.index = async (req, res) => {
   let find = {
      deleted: false,
   }

   const roles = await Roles.find(find);


   res.render("admin/pages/roles/index.pug", {
      pageTitle: "Nhom quen",
      records: roles
   })
}

// [get] /admin/roles/create
module.exports.create = async (req, res) => {
   let find = {
      deleted: false,
   }
   const records = await Roles.find(find);

   console.log(records);

   res.render("admin/pages/roles/create.pug", {
      pageTitle: "Tao nhom quyen",
      records: records
   });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {

   try {
      const records = new Roles(req.body);
      await records.save();
      res.redirect("/admin/roles/create");
      console.log("[CAP NHAT THANH CONG]");
   } catch (error) {
      console.log("[CAP NHAT THAT BAI]");
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
         pageTitle: "trang chinh sua nhom quyen",
         data: data
      });
   } catch (error) {
      res.render("/admin/roles");
   }
}

// [get] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
   try {
      const id = req.params.id;
      console.log(req.body);
      await Roles.updateOne({ _id: id }, req.body);
      req.flash("success", "CAP NHAT NHOM QUYEN THANH CONG");
   } catch (error) {
      req.flash("error", "CAP NHAT NHOM QUYEN THAT BAI");
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
      pageTitle: "Phan quyen",
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
      req.flash("success" , "Cap quyen thanh cong") ; 
   } catch (error) {
      req.flash("error" , "Cap quyen that ");
   }
   res.redirect("/admin/roles/permissions");
}
