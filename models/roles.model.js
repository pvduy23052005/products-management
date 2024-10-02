const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema(
   {
   title : String , 
   description : String , 
   permissions: {
      type : Array , 
      default : []
   }, 
   deleted : {
      type : Boolean , 
      default : false 
   }, 
   deletedAt : Date , 
   }, 
   {
      timeStamps : true  
   }
);

// tao ra mongoose.model(ten-model  , ten-Schema , connect den dataBase ) . 
const Role = mongoose.model("Role", rolesSchema, "roles");
module.exports = Role; 
