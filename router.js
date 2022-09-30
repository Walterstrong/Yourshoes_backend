const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

/*******************************
 *                             *
 *          REST API           *
 *                             *
 ******************************/

// memberga dahldor routerlar
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/menu", (req, res) => {
  res.send("menu sahifasidasiz");
});

// boshqa routerlar
router.get("/community", (req, res) => {
  res.send("jamiyat sahifasidasiz");
});

module.exports = router;
