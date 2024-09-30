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
   console.log(req.body);

   try {
      const records = new Roles(req.body);
      await records.save();
      res.redirect("/admin/roles/create");
      console.log("[CAP NHAT THANH CONG]");
   } catch (error) {
      console.log("[CAP NHAT THAT BAI]");
   }
}