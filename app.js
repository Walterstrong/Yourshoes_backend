console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");

//1:Kirish kodlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2: Session
//3:Views code
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routing code
app.use("/", router);
module.exports = app;
