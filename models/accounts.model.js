const mongoose = require("mongoose"); 
const randomString = require("../helpers/random.js"); 

const accountSchema = new mongoose.Schema(
   {
      fullName : String , 
      email : String , 
      password : String  , 
      token : {
         type : String , 
         default : randomString.randomString(20),
      } , 
      avatar : String , 
      role_id : String , 
      status : String , 
      deleted : {
         type : Boolean , 
         default : false 
      }, 
      deleteAt : Date , 
   }, 
   {
      timestamps : true , 
   }
); 

const Account = mongoose.model("Account" , accountSchema , "accounts"); 
module.exports = Account; 