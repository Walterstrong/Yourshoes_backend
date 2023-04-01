const CommentModel = require("../schema/comment.model");
const Definer = require("../lib/ mistake");
const assert = require("assert");
const Member = require("../models/Member");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const { look_up_member_liked } = require("../lib/config");

class Comment {
  constructor() {
    this.commentModel = CommentModel;
  }

  async createCommentData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);

      const new_comment = await this.saveCommentData(data);

      return new_comment;
    } catch (err) {
      throw err;
    }
  }

  async saveCommentData(data) {
    try {
      const comment = new this.commentModel(data);
      return await comment.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.mongo_validation_err1);
    }
  }

  async getCommentsData(member, inquery) {
    try {
      console.log("inquery", inquery);
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      const product_id = shapeIntoMongooseObjectId(
        inquery.comment_ref_product_id
      );
      let matches = {
        comment_status: "active",
        comment_ref_product_id: product_id,
      };
      inquery.limit *= 1;
      inquery.page *= 1;

      const sort = { createdAt: -1 };

      const result = await this.commentModel
        .aggregate([
          { $match: matches },
          { $sort: sort },
          { $skip: (inquery.page - 1) * inquery.limit },
          { $limit: inquery.limit },
          {
            $lookup: {
              from: "members",
              localField: "mb_id",
              foreignField: "_id",
              as: "member_data",
            },
          },
          { $unwind: "$member_data" },
          look_up_member_liked(auth_mb_id),
        ])
        .exec();

      assert.ok(result, Definer.article_err3);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getCommentDeleteData(member, comment_id) {
    try {
      comment_id = shapeIntoMongooseObjectId(comment_id);

      const result = await this.commentModel
        .findByIdAndUpdate(
          { _id: comment_id },
          { comment_status: "deleted" },
          { runValidators: true, lean: true, returnDocument: "after" }
        )
        .exec();

      assert.ok(result, Definer.general_err1);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Comment;
