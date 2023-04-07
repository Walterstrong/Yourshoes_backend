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
      // console.log("data:", data);
      let match = { product_status: "PROCESS" };

      if (data.restaurant_mb_id !== "all") {
        match["restaurant_mb_id"] = shapeIntoMongooseObjectId(
          data.restaurant_mb_id
        );
      } else {
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

      const sort =
        data.order === "product_price"
          ? { [data.order]: 1 }
          : { [data.order]: -1 };

      const result = await this.productModel
        .aggregate([
          { $match: match },
          { $sort: sort },
          { $skip: (data.page * 1 - 1) * data.limit },
          { $limit: data.limit * 1 },
          look_up_member_liked(auth_mb_id),
          look_up_member_viewed(auth_mb_id),
          // look_up_product_price(auth_mb_id),
          // look_up_product_price(auth_mb_id),
        ])
        .exec();
      // console.log("result:", result);
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

      const result = await this.productModel
        .aggregate([
          { $match: { _id: id, product_status: "PROCESS" } },
          look_up_member_liked(auth_mb_id),
          look_up_member_viewed(auth_mb_id),
        ])
        .exec();
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

  async updateChosenProductData(id, updated_data, mb_id) {
    try {
      id = shapeIntoMongooseObjectId(id);
      mb_id = shapeIntoMongooseObjectId(mb_id);

      const result = await this.productModel
        .findOneAndUpdate({ _id: id, restaurant_mb_id: mb_id }, updated_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
