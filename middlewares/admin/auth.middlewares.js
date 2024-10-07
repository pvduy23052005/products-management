const Accounts = require("../../models/accounts.model.js");

module.exports.requireAuth = async (req, res, next) => {
   try {
      // lay ra cookies . 
      if (!req.cookies.token) { // neu cookie rong 
         res.redirect("/admin/auth/login");
      } else { // new cookie ko rong . 
         const user = await Accounts.findOne({
            token: req.cookies.token,
            deleted: false
         });
         if (!user) {// neu ko co user
            res.redirect("/admin/auth/login");
         } else { // neu co user
            next();
         }
      }
   } catch (error) {
      console.log("loi phan requireAuth");
   }
}