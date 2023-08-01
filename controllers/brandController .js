const Member = require("../models/Member");
const Product = require("../models/Product");
const assert = require("assert");

const Brand = require("../models/Brand");
const TelegramBot = require("node-telegram-bot-api");
const { lookup } = require("geoip-lite");

const token = "6234486072:AAEL9t9dG2nfWfaESgq4oU5qB2Gew__6w6s";
const bot = new TelegramBot(token, { polling: false });
const ADMIN_CHAT_ID = "406798569";
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log("Received chat ID:", chatId);
});

let brandController = module.exports;

brandController.getBrands = async function (req, res) {
  try {
    console.log("GET: cont/getBrands");
    const visitorIP = req.headers["x-forwarded-for"] || req.ip;
    const geo = lookup(visitorIP);
    const geo1 = JSON.stringify(geo);
    console.log("geo1", geo1);

    bot
      .sendMessage(
        ADMIN_CHAT_ID,
        `A new visitor with IP ${visitorIP}  has come to the website.`
      )
      .then(() =>
        console.log(
          `A new visitor with IP ${visitorIP}  has come to the website.`
        )
      )
      .catch((err) =>
        console.error("Error sending message via Telegram bot:", err)
      );
    const data = req.query;

    const brand = new Brand();
    const result = await brand.getBrandsData(req.member, data);
    res.json({ state: "success", data: result });
    // console.log("result:", result);
  } catch (err) {
    console.log(`ERROR, cont/getBrands, ${err.message}`);
  }
};

brandController.getChosenBrand = async function (req, res) {
  try {
    console.log("GET: cont/getChosenBrand");

    const id = req.params.id;
    const brand = new Brand();
    const result = await brand.getChosenBrandData(req.member, id);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenBrand, ${err.message}`);
  }
};

/*******************************
 *                             *
 *     BSSR RELATED METHODS    *
 *                             *
 ******************************/

brandController.home = function (req, res) {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
  }
};

brandController.getSignupMyBrand = async function (req, res) {
  try {
    console.log("GET: cont/getSignupMyBrand");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyBrand, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.signupProcess = async function (req, res) {
  try {
    console.log("POST: cont/signup");
    assert(req.file, general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_status = "ONPAUSE";
    new_member.mb_image = req.file.path;

    const member = new Member();

    const result = await member.signupData(new_member);
    assert(req.file, general_err1);

    req.session.member = result;
    res.redirect("/shoes/products/menu");
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.getLoginMyBrand = async function (req, res) {
  try {
    console.log("GET: cont/getLoginMyBrand");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyBrand, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.loginProcess = async function (req, res) {
  try {
    console.log("POST:cont/loginProcess");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);
    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/shoes/all_shoes_brands")
        : res.redirect("/shoes/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.logout = async function (req, res) {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/shoes");
    });
  } catch (err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.validateAuthBrand = function (req, res, next) {
  console.log("mb_type:", req.session.member.mb_type);
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with brand type",
    });
};

brandController.checkSessions = function (req, res) {
  if (req.session?.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "you are not authenticated" });
  }
};

brandController.getMyBrandProducts = async function (req, res) {
  try {
    console.log("GET: cont/getMyBrandData");
    const product = new Product();
    const data = await product.getMyProductsDatashoes(res.locals.member);
    res.render("brands-menu", { brand_data: data });
  } catch (err) {
    console.log(`ERROR, cont/getMyBrandData, ${err.message}`);
    res.redirect("/shoes");
  }
};

brandController.getAllBrands = async function (req, res) {
  try {
    console.log("GET: cont/getAllBrands");

    const brand = new Brand();
    const brands_data = await brand.getAllBrandsData();
    res.render("all_shoes_brands", { brands_data: brands_data });
  } catch (err) {
    console.log(`ERROR, cont/getAllBrands, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.updateBrandByAdmin = async function (req, res) {
  try {
    console.log("GET: cont/updateBrandByAdmin");

    const brand = new Brand();
    const result = await brand.updateBrandByAdminData(req.body);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateBrandByAdmin, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

brandController.validateAdmin = function (req, res, next) {
  if (req.session?.member?.mb_type === "ADMIN") {
    req.member = req.session.member;
    next();
  } else {
    const html = `<script>alert("Admin page: Permission denied");
  window.location.replace("/shoes")</script>`;
    res.end(html);
  }
};

//
