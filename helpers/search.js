module.exports = (query) => {
   let object ={
      keyword : ""
   }
   // keyword ton tai moi set cho no . 
   if (query.keyword) {
      // gan cho keyword trong object . 
      object.keyword = query.keyword ; 
      // tim kiem theo regex . 
      object.TenSanPham = new RegExp(object.keyword, "i")
      
   }

   return object ; 
}