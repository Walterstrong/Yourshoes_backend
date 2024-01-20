const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "PEDAL", "RESTAURANT"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.ordernary_enums = ["Y", "N"];

exports.product_collection_enums = ["formal", "running", "training", "sports"];
exports.product_size_enums = ["all", "270", "275", "280", "285"];
exports.product_color_enums = ["white", "green", "blue", "red", "black"];
exports.product_type_enums = ["men", "women"];

exports.like_view_group_list = ["product", "member", "community", "comment"];
exports.board_id_enum_list = ["useful", "evaluation", "story"];

exports.order_status_enums = ["PAUSED", "PROCESS", "FINISHED", "DELETED"];

exports.board_id_enum_list = ["useful", "evaluation", "story"];
exports.board_article_status_enum_list = ["active", "deleted"];

exports.comment_status_enum_list = ["active", "deleted", "blocked"];

/*******************************
 *                             *
 *  MONGODB RELATED COMMANDS   *
 *                             *
 ******************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};

exports.look_up_member_following = (mb_id, origin) => {
  const follow_id = origin === "follows" ? "$subscriber_id" : "$_id";
  return {
    $lookup: {
      from: "follows",
      let: {
        lc_follow_id: follow_id,
        lc_subscriber_id: mb_id,
        nw_my_following: true,
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$follow_id", "$$lc_follow_id"] },
                { $eq: ["$subscriber_id", "$$lc_subscriber_id"] },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            subscriber_id: 1,
            follow_id: 1,
            my_following: "$$nw_my_following",
          },
        },
      ],
      as: "me_followed",
    },
  };
};

exports.look_up_member_liked = (mb_id) => {
  return {
    $lookup: {
      from: "likes",
      let: {
        lc_item_id: "$_id",
        lc_mb_id: mb_id,
        nw_my_favorite: true,
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$like_ref_id", "$$lc_item_id"] }, //likes collectionga borib "like_ref_id" si biz ko'rsatayotgan "mb_id" ga teng bo'lganini top
                { $eq: ["$mb_id", "$$lc_mb_id"] }, // topganlaring orasidan "mb_id" si mani "mb_id" ga teng bo'lganini top
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            mb_id: 1,
            like_ref_id: 1,
            my_favorite: "$$nw_my_favorite",
          },
        },
      ],
      as: "me_liked",
    },
  };
};

exports.look_up_member_viewed = (mb_id) => {
  return {
    $lookup: {
      from: "views",
      let: {
        lc_item_id: "$_id",
        lc_mb_id: mb_id,
        nw_my_view: true,
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$view_ref_id", "$$lc_item_id"] },
                { $eq: ["$mb_id", "$$lc_mb_id"] },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            mb_id: 1,
            view_ref_id: 1,
            my_view: "$$nw_my_view",
          },
        },
      ],
      as: "me_viewed",
    },
  };
};

exports.look_up_product_rating = (mb_id) => {
  return {
    pipeline: [
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
          _id: {
            product_id: "$ratings.comment_ref_product_id",
            avgRating: {
              $avg: "$ratings.product_rating",
            },
          },
        },
      },
      { $project: { category: "$_id", avgRating: 1 } },
    ],
    as: "me_vieweratid",
  };
};

exports.look_up_product_price = (mb_id) => {
  return {
    pipeline: [
      {
        $project: {
          _id: 1,
          name: 1,
          product_price: 1,
          product_discount: 1,
          discountedPrice: {
            $subtract: [
              "$product_price",
              {
                $multiply: [
                  "$product_price",
                  { $divide: ["$product_discount", 100] },
                ],
              },
            ],
          },
        },
      },
    ],
  };
};
// pipeline: [
//   {
//     $match: {
//       $expr: {
//         $and: [
//           { $eq: ["$view_ref_id", "$$lc_item_id"] }, //likes collectionga borib "like_ref_id" si biz ko'rsatayotgan "mb_id" ga teng bo'lganini top
//           { $eq: ["$mb_id", "$$lc_mb_id"] }, // topganlaring orasidan "mb_id" si mani "mb_id" ga teng bo'lganini top
//         ],
//       },
//     },
//   },
