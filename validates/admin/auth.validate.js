
// next de chay sang ham tiep theo . 
module.exports.login = (req , res , next) => {

   if(!req.body.email){
      req.flash("error" ,`Vui long nhap email ! ` ); 
      res.redirect("back"); 
      return ; 
   }

   if(!req.body.password){
      req.flash("error" ,`Vui long nhap mat khau ! `); 
      res.redirect("back"); 
      return ; 
   }

   next(); 
}