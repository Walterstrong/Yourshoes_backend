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
router.get("/check-me", memberController.checkMyAuthentication);
router.get("/menu", (req, res) => {
  res.send("menu sahifasidasiz");
});

router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);
// boshqa routerlar
router.get("/community", (req, res) => {
  res.send("jamiyat sahifasidasiz");
});

module.exports = router;
