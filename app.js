console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
const router__bssr = require("./router_bssr.js");

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
app.use("/resto", router__bssr);
module.exports = app;
