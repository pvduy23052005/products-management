const dashboardRoute = require("./dashboard.route.js");
const productRoute = require("./product.route.js");
const productCategoryRoute = require("./product-category.route.js");
const rolesRoute = require("./roles.route.js"); 
const accountRoute = require("./accounts.route.js"); 
module.exports = (app) => {
   app.use("/admin/dashboard", dashboardRoute)

   app.use("/admin/products-category", productCategoryRoute);

   app.use("/admin/products", productRoute);

   app.use("/admin/roles", rolesRoute);

   app.use("/admin/accounts" , accountRoute); 
}  