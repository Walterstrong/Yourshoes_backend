const mongoose = require("mongoose");
const {
  product_collection_enums,
  product_status_enums,
  product_size_enums,
  product_color_enums,
  product_type_enums,
} = require("../lib/config");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    restaurant_mb_id: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    product_name: {
      type: String,
      required: true,
    },
    product_color: {
      type: String,
      required: true,
      enum: {
        values: product_color_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    product_type: {
      type: String,
      required: true,
      enum: {
        values: product_type_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    product_collection: {
      type: String,
      required: true,
      enum: {
        values: product_collection_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    product_status: {
      type: String,
      required: true,
      default: "PAUSED",
      enum: {
        values: product_status_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    product_price: {
      type: Number,
      required: false,
    },
    discount: {
      type: {
        type: String,
        enum: ["percentage", "amount"],
        required: false,
      },
      value: {
        type: Number,
        required: false,
      },
      startDate: {
        type: Date,
        required: false,
      },
      endDate: {
        type: Date,
        required: false,
      },
      hasDate: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    product_left_cnt: {
      type: Number,
      required: true,
    },
    product_size: {
      type: String,
      required: true,
      enum: {
        values: product_size_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    product_description: { type: String, required: true },
    product_images: { type: Array, required: false, default: [] },
    product_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    product_views: {
      type: Number,
      required: false,
      default: 0,
    },
    product_reviews: {
      type: Number,
      required: false,
      default: 0,
    },
    product_rating: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);
productSchema.index(
  { restaurant_mb_id: 1, product_name: 1, product_size: 1 },
  { unique: true }
);

module.exports = mongoose.model("Product", productSchema);
