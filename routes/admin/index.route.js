const dashboardRoute = require("./dashboard.route.js");
const productRoute = require("./product.route.js"); 
module.exports = (app) => {
   app.use("/admin/dashboard", dashboardRoute)
   

   app.use("/admin/products" , productRoute ); 
}  