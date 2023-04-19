const CommentModel = require("../schema/comment.model");
const Definer = require("../lib/ mistake");
const assert = require("assert");
const Member = require("../models/Member");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const { look_up_member_liked } = require("../lib/config");
const ProductModel = require("../schema/product.model");
class Comment {
  constructor() {
    this.commentModel = CommentModel;
    this.productModel = ProductModel;
  }

  async createCommentData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);
      const new_comment = await this.saveCommentData(data);
      console.log("new_comment:", new_comment);
      const calculating_review = await this.calculatedReview(new_comment);

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

  async calculatedReview(new_comment) {
    try {
      const review_rating = await this.productModel
        .aggregate([
          {
            $match: {
              _id: new_comment.comment_ref_product_id,
              product_status: "PROCESS",
            },
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "comment_ref_product_id",
              as: "ratings",
            },
          },
          {
            $unwind: "$ratings",
          },

          {
            $group: {
              _id: "$ratings.comment_ref_product_id",
              avgRating: {
                $avg: "$ratings.product_rating",
              },
            },
          },
        ])
        .exec();

      // console.log("review_rating:", review_rating);

      const review_number = await this.commentModel
        .aggregate([
          {
            $match: {
              comment_ref_product_id: new_comment.comment_ref_product_id,
              comment_status: "active",
            },
          },
          { $count: "num" },
        ])
        .exec();

      // console.log("review_number:", review_number);

      const update_product = await this.updatedProductData(
        new_comment,
        review_rating,
        review_number
      );

      assert.ok(update_product, Definer.article_err4);

      // console.log("product_rating:", update_product.product_rating);
      // console.log("product_reviews:", update_product.product_reviews);

      return update_product;
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.mongo_validation_err1);
    }
  }

  async updatedProductData(new_comment, review_rating, review_number) {
    try {
      // console.log("1:");
      if (review_number.length === 0) {
        let num = { num: 0 };
        let avgRating = { avgRating: 0 };
        review_number.push(num);
        review_rating.push(avgRating);
      }

      // console.log("2:");

      const rating = review_rating[0].avgRating;
      const num = review_number[0].num;

      // console.log("rating:", rating);
      // console.log("reviews:", num);

      const update_product = await this.productModel
        .findByIdAndUpdate(
          { _id: new_comment.comment_ref_product_id },
          {
            product_reviews: num,
            product_rating: rating,
          },
          { runValidators: true, lean: true, returnDocument: "after" }
        )
        .exec();

      return update_product;
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.mongo_validation_err1);
    }
  }

  async getCommentsData(member, inquery) {
    try {
      // console.log("inquery", inquery);
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);

      let matches = {
        comment_status: "active",
      };

      if (inquery.comment_ref_product_id !== "all") {
        const product_id = shapeIntoMongooseObjectId(
          inquery.comment_ref_product_id
        );
        matches["comment_ref_product_id"] = product_id;
      }

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
        .findByIdAndDelete(
          { _id: comment_id }
          // { comment_status: "deleted" },
          // { runValidators: true, lean: true, returnDocument: "after" }
        )
        .exec();
      // console.log("result:", result);
      assert.ok(result, Definer.general_err1);
      await this.calculatedReview(result);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Comment;
