const express = require("express");
const router_bssr = express.Router();
const brandController = require("./controllers/brandController ");
const productController = require("./controllers/productController.js");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_members = require("./utils/upload-multer")("members");

/*******************************
 *                             *
 *          BSSR EJS           *
 *                             *
 ******************************/

router_bssr.get("/", brandController.home);

router_bssr.get("/sign-up", brandController.getSignupMyBrand);
router_bssr.post(
  "/sign-up",
  uploader_members.single("brand_img"),
  brandController.signupProcess
);

router_bssr.get("/login", brandController.getLoginMyBrand);
router_bssr.post("/login", brandController.loginProcess);

router_bssr.get("/logout", brandController.logout);
// bu mantiq faqatgina postman uchun kerak`
router_bssr.get("/check-me", brandController.checkSessions);

router_bssr.get("/products/menu", brandController.getMyBrandProducts);

router_bssr.post(
  "/products/create",
  brandController.validateAuthBrand,
  //bu nima uchun kerak?
  // bu faqatgina postmanda ishlashimiz uchun kerak, chunki
  uploader_product.array("product_images", 5),
  productController.addNewProduct
);

router_bssr.post(
  "/products/edit/:id",
  brandController.validateAuthBrand,
  productController.updateChosenProduct
);

router_bssr.get(
  "/all_shoes_brands",
  brandController.validateAdmin,
  brandController.getAllBrands
);

router_bssr.post(
  "/all_shoes_brands/edit",
  brandController.validateAdmin,
  brandController.updateBrandByAdmin
);

router_bssr.put(
  "/update-discounts/",
  // brandController.validateAuthBrand,
  productController.updateChosenProductDiscount
);

module.exports = router_bssr;
