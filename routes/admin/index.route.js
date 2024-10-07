const dashboardRoute = require("./dashboard.route.js");
const authMiddleware = require("../../middlewares/admin/auth.middlewares.js");
const productRoute = require("./product.route.js");
const productCategoryRoute = require("./product-category.route.js");
const rolesRoute = require("./roles.route.js");
const accountRoute = require("./accounts.route.js");
const authRoute = require("./auth.route.js");


module.exports = (app) => {
   app.use("/admin/dashboard",
      authMiddleware.requireAuth,
      dashboardRoute);

   app.use("/admin/products-category",
      authMiddleware.requireAuth,
      productCategoryRoute);

   app.use("/admin/products",
      authMiddleware.requireAuth,
      productRoute);

   app.use("/admin/roles",
      authMiddleware.requireAuth,
      rolesRoute);

   app.use("/admin/accounts",
      authMiddleware.requireAuth,
      accountRoute);

   app.use("/admin/auth", authRoute);
}  