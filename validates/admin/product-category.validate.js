
// next de chay sang ham tiep theo . 
module.exports.createPost = (req , res , next) => {
   // neu TenSanPham
   if(!req.body.TenSanPham){
      req.flash("error" ,`Vui lòng nhập tiêu đề! ` ); 
      res.redirect("back"); 
      return ; 
   }
   next(); 
}