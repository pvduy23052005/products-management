
const product = require("../models/product.model.js");

module.exports.supplier = async () => {
   const records = await product.find({
      deleted : false 
   })
   // tao ra key nhaCungCap . 
   let mapSupplier = new Map();
   for(const item of records){
      if (mapSupplier.has(item.nhaCungCap)) {
         const cnt = mapSupplier.get(item.nhaCungCap);
         mapSupplier.set(item.nhaCungCap, cnt + 1);
      }
      else {
         mapSupplier.set(item.nhaCungCap , 1) ; 
      }
   }
   let arrSupplier = []; 
   mapSupplier.forEach( (value , key) => {
      const arr = []; 
      const string = `${key}`; 
      arr.value = string ;
      arr.title = key ; 
      arrSupplier.push(arr);
   }); 
   console.log(arrSupplier);

   return arrSupplier ;
}