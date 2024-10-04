
const Account = require("../../models/accounts.model.js");

// [get]  /admin/auth/login
module.exports.login = (req, res) => {
   if (req.cookies.token) {
      res.redirect("/admin/dashboard");
   } else {
      res.render("admin/pages/auth/login.pug", {
         pageTitle: "Đăng nhập",
      });
   }
}

// [post]  /admin/auth/login
module.exports.loginPost = async (req, res) => {

   const email = req.body.email;
   const password = req.body.password;

   const user = await Account.findOne({
      email: email,
      deleted: false,
   });
   // kiem tra email co dung ko 
   if (!user) {
      // đưa ra thông báo 
      req.flash("error", "Email không tồn tạo");
      res.redirect("/admin/auth/login");
      return;
   }

   // kiểm tra mật khẩu đúng không 
   if (password != user.password) {
      req.flash("error", "Mat khau sai ! ");
      res.redirect("/admin/auth/login");
      return;
   }

   if (user.status == "inactive") {
      req.flash("error", "Tài khoản bị khóa");
      res.redirect("/admin/auth/login");
      return;
   }
   // xet 
   res.cookie("token", user.token);
   res.redirect("/admin/dashboard");
}

// [get]  /admin/auth/logout
module.exports.logout = (req, res) => {
   // xoa cookie ham res.clearCookie("")
   res.clearCookie("token");
   res.redirect("/admin/auth/login");
}