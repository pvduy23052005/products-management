// truyen vao 1 object 1. 
// query : la url de lay ra . 
// countProduct : so luong ban ghi trong databse . 
module.exports =  (objectPagination , query , countProduct) =>{
   if( query.page){// chuyen ve dang so . 
      objectPagination.currentPase = parseInt(query.page) ; 
   }
   //dem so luong product . 
   
   // tinh so trang   .
   const soLuongPage = Math.ceil(countProduct /objectPagination.limitItems);

   // so luong san pham cua 1 trang phan trang . 
   objectPagination.skip = (objectPagination.currentPase -1) * objectPagination.limitItems ; 
   
   // cap  nhat so trang vao object . 
   objectPagination.soLuongPage = soLuongPage; 
      
   // tra ve object do . 
   return objectPagination ;
}