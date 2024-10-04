  // thep thang express vao file index . 
const express = require("express");
const methodOverride = require("method-override"); 
require("dotenv").config(); 

// nhung file vao phan 
const route1 = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js"); 

// nhung file ket noi database 
const database = require("./config/database.js");
database.connect();

// cho app = expre
const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

// phan tich du lieu Json .
const cors = require('cors'); 
app.use(cors());


// thu vien de tra ve object cho name , va ids . 
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: true })); // Để phân tích dữ liệu x-www-form-urlencoded

// nhung file tinh . 
app.use(express.static(`${__dirname}/public`));

//Fash : HIEN THI THONG BAO CHO  
const flash = require("express-flash"); 
const  cookieParser = require("cookie-parser"); 
const session = require("express-session"); 
app.use(cookieParser("PHUNGVANDUY")); 
app.use(session({cookie:  { maxAge : 60000}})); 
app.use(flash()); 

// cau hinh cho pug . 
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// goi route vua nhung o code 5 .chuyen vao app .  
route1(app);
routeAdmin(app); 

app.listen(port, () => {
   console.log(`Sever is running ${port}`);
});