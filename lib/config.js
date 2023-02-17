const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "PEDAL", "RESTAURANT"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordernary_enums = ["Y", "N"];
exports.product_collection_enums = ["dish", "salad", "dessert", "drink", "etc"];

exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_size_enums = ["small", "normal", "large", "set"];
exports.product_volume_enums = [0.5, 1, 1.2, 1.5, 2];
exports.like_view_group_list = ["product", "member", "community", "comment"];
exports.board_id_enum_list = ["celebrity", "evaluation", "story"];

exports.order_status_enums = ["PAUSED", "PROCESS", "FINISHED", "DELETED"];

exports.board_id_enum_list = ["celebrity", "evaluation", "story"];
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
