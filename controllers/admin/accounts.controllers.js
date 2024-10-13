// nhung model
const Account = require("../../models/accounts.model.js");
const Roles = require("../../models/roles.model.js");
const md5 = require("md5");

// [get] /admin/accounts
module.exports.index = async (req, res) => {
   try {
      let find = {
         deleted: false
      }
      // // lay ra account password , token ,
      const records = await Account.find(find).select("-password-token");

      try {
         for (const record of records) {
            const role = await Roles.findOne({
               _id: record.role_id,
               deleted: false
            });
            record.role = role.title;
         }
      } catch (error) {
         console.error("Không thêm mới được", error);
      }

      res.render("admin/pages/accounts/index.pug", {
         pageTitle: "Danh sách tài khoản",
         records: records
      });
   } catch (error) {
      console.log("lỗi rồi");
   }
}

// [get] /admin/accounts/create
module.exports.create = async (req, res) => {
   try {
      let find = {
         deleted: false
      }
      const roles = await Roles.find(find);

      res.render("admin/pages/accounts/create.pug", {
         pageTitle: "Tạo tài khoản",
         roles: roles
      });
   } catch (error) {
      console.error("loi phan tao tai khoan ", error);
   }
}

// [post] /admin/accounts/create
module.exports.createPost = async (req, res) => {
   const check = await Account.findOne({
      deleted: false,
      email: req.body.email
   });
   try {
      if (check) {// email da ton tai roi 
         try {
            req.flash("error", `Email đã tồn tại`);
         } catch (error) {
            console.error("loi phan email ", error);
         }
         res.redirect("back");
      } else { // email chua ton tai .  
         try {
            req.body.password = md5(req.body.password);
            const record = new Account(req.body);
            await record.save();
            req.flash("success", "Tạo thành công");
         } catch (error) {
            req.flash("error", "Tạo thất bại");
         }
         res.redirect("/admin/accounts");
      }
   } catch (error) {
      console.log("Loi");
   }
}


