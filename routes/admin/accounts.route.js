const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
const controller = require("../../controllers/admin/accounts.controllers.js");
const validate = require("../../validates/admin/account.validate.js");
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
   upload.single("avatar"),
   uploadCloud.uploadCloud,
   validate.createPost,
   controller.createPost
);

module.exports = router; 