// them thu vien express vao dung ham tao 1 route
const express = require("express");
const router = express.Router();
// import controller vao . 
const homeController = require("../../controllers/client/home.controller.js");

// tao cac rou ther con
router.get("/", homeController.inex);

// xuat ra router moi su dung dc . 
module.exports = router; 