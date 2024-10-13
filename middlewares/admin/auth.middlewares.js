const Accounts = require("../../models/accounts.model.js");
const Role = require("../../models/roles.model.js")

module.exports.requireAuth = async (req, res, next) => {
   try {
      // lay ra cookies . 
      if (!req.cookies.token) { // neu cookie rong 
         res.redirect("/admin/auth/login");
      } else { // new cookie ko rong . 
         const user = await Accounts.findOne({
            token: req.cookies.token,
            deleted: false
         }).select("-password");
         if (!user) {// neu ko co user
            res.redirect("/admin/auth/login");
         } else { // neu co user
            res.locals.user = user ; 
            const role = await Role.findOne({
               _id : user.role_id 

            }).select("title permissions"); 
            res.locals.role = role 
            next();
         }
      }
   } catch (error) {
      console.log("loi phan requireAuth");
   }
}