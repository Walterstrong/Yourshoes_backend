const { shapeIntoMongooseObjectId } = require("../lib/config");
const ProductModel = require("../schema/product.model");
const assert = require("assert");
const Definer = require("../lib/ mistake");

class Product {
  constructor() {
    this.productModel = ProductModel;
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
}

module.exports = Product;
