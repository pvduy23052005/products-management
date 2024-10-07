
// next de chay sang ham tiep theo . 
module.exports.createPost = (req , res , next) => {
   // neu TenSanPham
   if(!req.body.TenSanPham){
      req.flash("error" ,`Vui long nhap tieu de! ` ); 
      res.redirect("back"); 
      return ; 
   }

   if(!req.body.gia){
      req.flash("error" ,`Vui lòng nhập giá `); 
      res.redirect("back"); 
      return ; 
   }
   next(); 
}