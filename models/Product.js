const {
  shapeIntoMongooseObjectId,
  look_up_member_liked,
  look_up_member_viewed,
  look_up_product_price,
} = require("../lib/config");
const {
  product_collection_enums,
  product_size_enums,
  product_color_enums,
  product_type_enums,
} = require("../lib/config");
const ProductModel = require("../schema/product.model");
const assert = require("assert");
const Definer = require("../lib/ mistake");
const Member = require("../models/Member");
class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAllProductsData(member, data) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);

      let match = { product_status: "PROCESS" };

      if (data.order === "discount.value") {
        match["$expr"] = {
          $and: [
            { $ifNull: ["$discount", false] },
            { $lte: ["$discount.startDate", new Date()] },
            { $gte: ["$discount.endDate", new Date()] },
          ],
        };
      }

      if (data.restaurant_mb_id !== "all") {
        match["restaurant_mb_id"] = shapeIntoMongooseObjectId(
          data.restaurant_mb_id
        );
      }

      if (data.product_name !== "all") {
        match["product_name"] = {
          $regex: new RegExp(data.product_name, "i"),
        };
      }

      //product_collection;
      if (data.product_collection === "all") {
        match["product_collection"] = { $in: product_collection_enums };
      } else {
        match["product_collection"] = data.product_collection;
      }

      //product_size
      if (data.product_size === "all") {
        match["product_size"] = { $in: product_size_enums };
      } else {
        match["product_size"] = { $in: product_size_enums };
      }

      //product_type
      if (data.product_type === "all") {
        match["product_type"] = { $in: product_type_enums };
      } else {
        match["product_type"] = data.product_type;
      }

      //product_color
      if (data.product_color === "all") {
        match["product_color"] = { $in: product_color_enums };
      } else {
        match["product_color"] = data.product_color;
      }

      const sort = {};

      if (data.order === "product_price") {
        sort[data.order] = 1;
      } else if (data.order === "discount.value") {
        sort["sortDiscountValue"] = -1;
      } else {
        sort[data.order] = -1;
      }

      const pipeline = [
        { $match: match },
        {
          $addFields: {
            discountedPrice: {
              $cond: [
                {
                  $and: [
                    { $ifNull: ["$discount", false] },
                    { $lte: ["$discount.startDate", new Date()] },
                    { $gte: ["$discount.endDate", new Date()] },
                    { $ne: ["$discount.value", 0] },
                  ],
                },
                {
                  $cond: [
                    { $eq: ["$discount.type", "percentage"] },
                    {
                      $multiply: [
                        {
                          $subtract: [1, { $divide: ["$discount.value", 100] }],
                        },
                        "$product_price",
                      ],
                    },
                    { $subtract: ["$product_price", "$discount.value"] },
                  ],
                },
                {
                  $cond: [{ $eq: ["$discount.value", 0] }, 0, 0],
                },
              ],
            },
          },
        },
        {
          $addFields: {
            discountedPrice: {
              $cond: [{ $eq: ["$discount.value", 0] }, 0, "$discountedPrice"],
            },
          },
        },
        {
          $addFields: {
            sortDiscountValue: {
              $cond: [
                {
                  $and: [
                    { $ifNull: ["$discount", false] },
                    { $lte: ["$discount.startDate", new Date()] },
                    { $gte: ["$discount.endDate", new Date()] },
                  ],
                },
                "$discount.value",
                null,
              ],
            },
          },
        },
        {
          $addFields: {
            sortDiscountValue: {
              $cond: [
                { $eq: ["$sortDiscountValue", null] },
                -Infinity,
                "$sortDiscountValue",
              ],
            },
          },
        },
        { $sort: sort },
        { $skip: (data.page * 1 - 1) * data.limit },
        { $limit: data.limit * 1 },
        look_up_member_liked(auth_mb_id),
        look_up_member_viewed(auth_mb_id),
      ];

      const result = await this.productModel.aggregate(pipeline).exec();
      assert.ok(result, Definer.general_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenProductData(member, id) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      id = shapeIntoMongooseObjectId(id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "product");
      }
      let match = { _id: id, product_status: "PROCESS" };

      const pipeline = [
        { $match: match },
        {
          $addFields: {
            discountedPrice: {
              $cond: [
                {
                  $and: [
                    { $ifNull: ["$discount", false] },
                    { $lte: ["$discount.startDate", new Date()] },
                    { $gte: ["$discount.endDate", new Date()] },
                    { $ne: ["$discount.value", 0] },
                  ],
                },
                {
                  $cond: [
                    { $eq: ["$discount.type", "percentage"] },
                    {
                      $multiply: [
                        {
                          $subtract: [1, { $divide: ["$discount.value", 100] }],
                        },
                        "$product_price",
                      ],
                    },
                    { $subtract: ["$product_price", "$discount.value"] },
                  ],
                },
                {
                  $cond: [{ $eq: ["$discount.value", 0] }, 0, 0],
                },
              ],
            },
          },
        },
        look_up_member_liked(auth_mb_id),
        look_up_member_viewed(auth_mb_id),
      ];

      const result = await this.productModel.aggregate(pipeline).exec();
      assert.ok(result, Definer.general_err1);
      // console.log("result", result);
      return result[0];
    } catch (err) {
      throw err;
    }
  }
  /*******************************
   *                             *
   *     BSSR RELATED METHODS    *
   *                             *
   ******************************/
  async getMyProductsDataResto(member) {
    try {
      member._id = shapeIntoMongooseObjectId(member._id);
      const result = await this.productModel.find({
        restaurant_mb_id: member._id,
      });
      assert.ok(result, Definer.general_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async addNewProduct(data, member) {
    try {
      data.restaurant_mb_id = shapeIntoMongooseObjectId(member._id);

      const new_product = new this.productModel(data);
      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
  // for bssr
  async updateChosenProductData(id, updated_data) {
    try {
      console.log("1");
      id = shapeIntoMongooseObjectId(id);
      // mb_id = shapeIntoMongooseObjectId(mb_id);
      console.log("2");
      const result = await this.productModel
        .findOneAndUpdate({ _id: id }, updated_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();
      console.log("3", result);
      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenDiscountProductData(productId, update) {
    try {
      console.log("1");
      productId = shapeIntoMongooseObjectId(productId);
      // mb_id = shapeIntoMongooseObjectId(mb_id);

      const result = await this.productModel
        .findByIdAndUpdate(
          { _id: productId },
          {
            $set: {
              "discount.type": update.discount.type,
              "discount.value": update.discount.value,
              "discount.startDate": update.discount.startDate,
              "discount.endDate": update.discount.endDate,
            },
          },
          { runValidators: true, lean: true, returnDocument: "after" }
        )
        .exec();

      console.log("3", result);
      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenProductDiscountDataAll() {
    try {
      const result = await this.productModel
        .updateMany(
          { product_discount: { $exists: true } },
          {
            $set: {
              discount: {
                type: "percentage",
                value: 0,
                startDate: null,
                endDate: null,
              },
            },
            $unset: { product_discount: "" },
          }
        )
        .exec();

      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
