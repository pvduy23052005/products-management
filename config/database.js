
const mongoose = require('../node_modules/mongoose');

module.exports.connect = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/Data-base');
      console.log("Thanh cong");
   } catch {
      console.log("That bai ");
   }
}
// tao model cho database
