const Member = require("../models/Member");
const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/ mistake");
const Restaurant = require("../models/Restaurant");
const TelegramBot = require("node-telegram-bot-api");
const geoip = require("geoip-lite");
const token = "6234486072:AAEL9t9dG2nfWfaESgq4oU5qB2Gew__6w6s";
const bot = new TelegramBot(token, { polling: false });
const ADMIN_CHAT_ID = "406798569";
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log("Received chat ID:", chatId);
});
let restaurantController = module.exports;

restaurantController.getRestaurants = async (req, res) => {
  try {
    console.log("GET: cont/getRestaurants");
    const visitorIP = req.headers["x-forwarded-for"] || req.ip;
    const geo = geoip.lookup(visitorIP);

    bot
      .sendMessage(
        ADMIN_CHAT_ID,
        `A new visitor with IP ${visitorIP} from ${geo} has come to the website.`
      )
      .then(() =>
        console.log(
          `A new visitor with IP ${visitorIP} from ${geo} has come to the website.`
        )
      )
      .catch((err) =>
        console.error("Error sending message via Telegram bot:", err)
      );
    const data = req.query;

    const restaurant = new Restaurant();
    const result = await restaurant.getRestaurantsData(req.member, data);
    res.json({ state: "success", data: result });
    // console.log("result:", result);
  } catch (err) {
    console.log(`ERROR, cont/getRestaurants, ${err.message}`);
  }
};

restaurantController.getChosenRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getChosenRestaurant");

    const id = req.params.id;
    const restaurant = new Restaurant();
    const result = await restaurant.getChosenRestaurantData(req.member, id);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenRestaurant, ${err.message}`);
  }
};

/*******************************
 *                             *
 *     BSSR RELATED METHODS    *
 *                             *
 ******************************/

restaurantController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
  }
};

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_status = "ONPAUSE";
    new_member.mb_image = req.file.path;

    const member = new Member();

    const result = await member.signupData(new_member);
    assert(req.file, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST:cont/loginProcess");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);
    // console.log("result:", result);
    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurants")
        : res.redirect("/resto/products/menu");
    });
    // bu yerdan faqatgina adminlargina kirsin degan mantiqni yaratishimiz mumkin
  } catch (err) {
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = async (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  console.log("mb_type:", req.session.member.mb_type);
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "you are not authenticated" });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantData");
    const product = new Product();
    const data = await product.getMyProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantData, ${err.message}`);
    res.redirect("/resto");
  }
};

restaurantController.getAllRestaurants = async (req, res) => {
  try {
    console.log("GET: cont/getAllRestaurants");

    const restaurant = new Restaurant();
    const restaurants_data = await restaurant.getAllRestaurantsData();
    res.render("all-restaurants", { restaurants_data: restaurants_data });
  } catch (err) {
    console.log(`ERROR, cont/getAllRestaurants, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.updateRestaurantByAdmin = async (req, res) => {
  try {
    console.log("GET: cont/updateRestaurantByAdmin");

    const restaurant = new Restaurant();
    const result = await restaurant.updateRestaurantByAdminData(req.body);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateRestaurantByAdmin, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    req.member = req.session.member;
    next();
  } else {
    const html = `<script>alert("Admin page: Permission denied");
  window.location.replace("/resto")</script>`;
    res.end(html);
  }
};

//
