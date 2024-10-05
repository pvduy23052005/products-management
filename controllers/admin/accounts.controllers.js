// nhung model
const Account = require("../../models/accounts.model.js");
const Roles = require("../../models/roles.model.js");
const md5 = require("md5");

// [get] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  // lay ra account password , token ,
  const records = await Account.find(find).select("-password-token ");
  for (const record of records) {
    const role = await Roles.findOne({
      deleted: false,
      _id: record.role_id,
    });
    record.role = role.title;
  }

  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

// [get] /admin/accounts/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Account.find(find);
  const roles = await Roles.find({ deleted: false });

  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo tài khoản",
    records: records,
    roles: roles,
  });
};

// [post] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  // kiem tra email .
  // const checkEmail = await Account.findOne(
  //    {
  //       email: req.body.email,
  //       deleted: false
  //    }
  // )

  if (false) {
    // email da ton tai roi
    try {
      req.flash("error", `Email đã tồn tại`);
      res.redirect("back");
    } catch (error) {
      console.log("lỗi");
    }
    res.redirect("back");
  } else {
    // email chua ton tai .
    try {
      const record = new Account(req.body);
      req.body.password = md5(req.body.password);
      await record.save();
      req.flash("success", "tạo thành công");
    } catch (error) {
      req.flash("error", "tạo thất bại");
    }
    res.redirect("/admin/accounts");
  }
};
