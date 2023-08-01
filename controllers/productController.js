let productController = module.exports;
const assert = require("assert");
const Definer = require("../lib/ mistake");
const Product = require("../models/Product");

productController.getAllProducts = async (req, res) => {
  try {
    console.log("POST: cont/getAllProducts");
    const product = new Product();
    const result = await product.getAllProductsData(req.member, req.body);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getAllProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.getChosenProduct = async (req, res) => {
  try {
    console.log("GET: cont/getChosenProduct");
    const product = new Product();
    const id = req.params.id;
    const result = await product.getChosenProductData(req.member, id);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

/*******************************
 *                             *
 *     BSSR RELATED METHODS    *
 *                             *
 ******************************/

productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: cont/addNewProduct");
    assert(req.files, Definer.general_err3);
    // console.log("req.files: " + req.files);
    const product = new Product();
    let data = req.body;

    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    const result = await product.addNewProduct(data, req.member);
    const html = `<script>alert("new product added successdully");
    window.location.replace("/shoes/products/menu")</script>`;
    res.end(html);
  } catch (err) {
    console.log(`ERROR, cont/addNewProduct, ${err.message}`);
  }
};
// for bssr
productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
    console.log("req.body", req.body);
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(id, req.body);
    console.log("result", result);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.updateChosenProductDiscount = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
    console.log("req.body", req.body);
    const product = new Product();
    const productId = req.params.id;

    const result = await product.updateChosenDiscountProductData(
      productId,
      req.body
    );
    console.log("result", result);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
    console.log("req.body", req.body);
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(id, req.body);
    console.log("result", result);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
// changing product schema including inputed product
productController.updateChosenProductDiscountAll = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProductDiscount");
    const product = new Product();
    const result = await product.updateChosenProductDiscountDataAll();
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

module.exports = productController;
