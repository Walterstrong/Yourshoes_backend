const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const assert = require("assert");
const Definer = require("../lib/ mistake");
const TelegramBot = require("node-telegram-bot-api");
const token = "6234486072:AAEL9t9dG2nfWfaESgq4oU5qB2Gew__6w6s";
const bot = new TelegramBot(token, { polling: false });
const ADMIN_CHAT_ID = "406798569";

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST:cont/signup");
    const data = req.body;

    const member = new Member();
    const new_member = await member.signupData(data);
    const token = memberController.createToken(new_member);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });

    const guest = new_member.mb_nick;
    await Promise.all([
      bot.sendMessage(ADMIN_CHAT_ID, `user "${guest}" login now`),
      console.log(`user ${guest} login now`),
    ]);

    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    if (err.message === "mb_nick is already in use") {
      res.status(400).json({ state: "fail", message: Definer.auth_err6 });
    } else {
      res.status(500).json({ state: "fail", message: "Internal Server Error" });
    }
  }
};

//

memberController.login = async (req, res) => {
  try {
    console.log("POST:cont/login");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

    const token = memberController.createToken(result);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });

    const guest = result.mb_nick;
    await Promise.all([
      bot.sendMessage(ADMIN_CHAT_ID, `user "${guest}" login now`),
      console.log(`user ${guest} login now`),
    ]);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2);
    return token;
  } catch (err) {
    throw err;
  }
};

//

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("POST:cont/checkMyAuthentication");

    let token = req.cookies["access_token"];

    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err2);

    res.json({ state: "success", data: member });
  } catch (err) {
    throw err;
  }
};

//

memberController.logout = (req, res) => {
  console.log("POST:cont/logout");
  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
  res.json({ state: "success", data: "logout successfully" });
};

//

memberController.getChosenMember = async (req, res) => {
  try {
    console.log("POST:cont/ChosenMember");
    const id = req.params.id;

    const member = new Member();
    const result = await member.getChosenMemberData(req.member, id);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/ChosenMember, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//

memberController.retrieveAuthMember = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err) {
    console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
    next();
  }
};

//

memberController.likeMemberChosen = async (req, res) => {
  try {
    console.log("POST:cont/likeMemberChosen:", req.body);
    const mb_nick = req.member.mb_nick;
    const type = req.body.group_type;
    const ref_id = req.body.like_ref_id;

    bot
      .sendMessage(
        ADMIN_CHAT_ID,
        `user "${mb_nick}" liked "${ref_id}" which is  "${type}"`
      )
      .then(() => console.log("Message sent to admin via Telegram bot"))
      .catch((err) =>
        console.error("Error sending message via Telegram bot:", err)
      );
    assert.ok(req.member, Definer.auth_err5);
    const member = new Member();
    const like_ref_id = req.body.like_ref_id;
    const group_type = req.body.group_type;

    const result = await member.likeChosenItemByMember(
      req.member,
      like_ref_id,
      group_type
    );
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/likeMemberChosen, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.updateMember = async (req, res) => {
  try {
    console.log("POST:cont/updateMember");
    assert.ok(req.member, Definer.auth_err3);
    const member = new Member();
    const result = await member.updateMemberData(
      req.member?._id,
      req.body,
      req.file
    );

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateMember, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
