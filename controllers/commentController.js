const Comment = require("../models/Comment");
const assert = require("assert");
const Definer = require("../lib/ mistake");
const TelegramBot = require("node-telegram-bot-api");
const token = "6234486072:AAEL9t9dG2nfWfaESgq4oU5qB2Gew__6w6s";
const bot = new TelegramBot(token, { polling: false });
const ADMIN_CHAT_ID = "406798569";

let commentController = module.exports;

commentController.createComment = async (req, res) => {
  try {
    console.log("POST: cont/createComment");
    const mb_nick = req.member.mb_nick;
    const content = req.body.comment_content;
    const ratings = req.body.product_rating;

    bot
      .sendMessage(
        ADMIN_CHAT_ID,
        `user "${mb_nick} " write "${content}" with rating "${ratings}"`
      )
      .then(() => console.log("Message sent to admin via Telegram bot"))
      .catch((err) =>
        console.error("Error sending message via Telegram bot:", err)
      );
    const comment = new Comment();

    const result = await comment.createCommentData(req.member, req.body);
    assert.ok(result, Definer.general_err1);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createComment, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

commentController.getComments = async (req, res) => {
  try {
    console.log("GET: cont/getComments");
    const comment = new Comment();
    const result = await comment.getCommentsData(req.member, req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getComments, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

commentController.getCommentDelete = async (req, res) => {
  try {
    console.log("GET: cont/getCommentDelete");
    const comment_id = req.params.comment_id;
    const comment = new Comment();
    const result = await comment.getCommentDeleteData(req.member, comment_id);

    res.json({ state: "success", data: "deleted" });
  } catch (err) {
    console.log(`ERROR, cont/getCommentDelete, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

commentController.new = async (req, res) => {
  try {
    console.log("GET: cont/getCommentDelete");
    console.log(JSON.stringify(req.body.product, null, 2));

    res.json({ state: "success", data: "deleted" });
  } catch (err) {
    console.log(`ERROR, cont/getCommentDelete, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
