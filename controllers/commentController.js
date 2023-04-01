const Comment = require("../models/Comment");
const assert = require("assert");
const Definer = require("../lib/ mistake");

let commentController = module.exports;

commentController.createComment = async (req, res) => {
  try {
    console.log("POST: cont/createComment");
    console.log("req.body", req.body);

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
