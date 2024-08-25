
const mongoose = require('../node_modules/mongoose');

module.exports.connect = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Thanh cong");
   } catch {
      console.log("That bai ");
   }
}
// tao model cho database
