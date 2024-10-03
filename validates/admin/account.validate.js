
// next de chay sang ham tiep theo . 
module.exports.createPost = (req , res , next) => {
   // neu TenSanPham
   if(!req.body.fullName){
      req.flash("error" ,`Vui long nhap ho ten! ` ); 
      res.redirect("back"); 
      return ; 
   }

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