const mongoose = require("mongoose");
const { comment_status_enum_list } = require("../lib/config");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    comment_content: { type: String, required: true },

    comment_status: {
      type: String,
      required: false,
      default: "active",
      enum: {
        values: comment_status_enum_list,
      },
      message: "{VALUE} is not among permitted values",
    },

    comment_likes: { type: Number, required: false, default: 0 },

    mb_id: { type: Schema.Types.ObjectId, ref: "Member", required: true },

    comment_ref_product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    comment_ref_restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    product_rating: { type: Number, required: false, default: 0 },
  },

  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
