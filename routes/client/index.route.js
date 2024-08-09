// nhung product route . 
const productRoute = require("./product.route.js");
// nhung home.route.js
const homeRoute = require("./home.route.js");

// chia ra cac route ra . 
// de nhung dc 1 file . 
module.exports = (app) => {
     // req (request)yeu cau nguoi phia client . 
     // res (response) :  phia Sever chua cac phuong thuc 
     app.use("/", homeRoute);

     // tao 1 trang khac so vs trang chu .  
     app.use("/products", productRoute);
}