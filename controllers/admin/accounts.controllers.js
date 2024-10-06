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
      // console.log(records) ; 
      // try {
      //    console.log(record); 
      //    for( const record of records){
      //       const role = await Roles.findOne({
      //          deleted : false ,
      //          _id : record.role_id
      //       });
      //       console.log(role); 
      //       record.role = role.title ; 
      //    }
      // } catch (error) {
      //    console.error("Khong them phan quyen " , error) ; 
      // }

      res.render("admin/pages/accounts/index.pug", {
         pageTitle: "Danh sách tài khoản",
         records: records
      });
   } catch (error) {
      console.log("loi roi") ; 
   }
}

// [get] /admin/accounts/create
module.exports.create = async (req, res) => {
   try {
      let find = {
         deleted: false
      }
   
      const records = await Account.find(find);
      const roles = await Roles.find({ deleted: false });
      
      res.render("admin/pages/accounts/create.pug", {
         pageTitle: "Tạo tài khoản",
         records: records,
         roles: roles
      });
   } catch (error) {
      console.error("loi :" , error) ;  
   }
}

// [post] /admin/accounts/create
module.exports.createPost = async (req, res) => {

   

   try {
      
      if (false) {// email da ton tai roi 
         try {
            req.flash("error", `Email đã tồn tại`);
            res.redirect("back"); 
         } catch (error) {
            console.log("loi");
         }
         res.redirect("back"); 
   
      } else { // email chua ton tai .  
         try {
            const record = new Account(req.body);
            req.body.password = md5(req.body.password);
            await record.save();
            req.flash("success", "Tạo thành công");
         } catch (error) {
            req.flash("error", "Tạo thất bại"); 
         }
         res.redirect("/admin/accounts");
      }
   } catch (error) {
      console.error("Loi")
   }
}


