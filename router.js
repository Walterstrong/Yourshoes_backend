const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const brandController = require("./controllers/brandController ");
const orderController = require("./controllers/orderController.js");
const communityController = require("./controllers/communityController.js");
const commentController = require("./controllers/commentController.js");
const followController = require("./controllers/followController.js");
const uploader_community = require("./utils/upload-multer")("community");
const uploader_member = require("./utils/upload-multer")("members");

/*******************************
 *                             *
 *          REST API           *
 *                             *
 ******************************/

// Member related routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);
router.post(
  "/member-liken",
  memberController.retrieveAuthMember,
  memberController.likeMemberChosen
);

router.post(
  "/member/update",
  memberController.retrieveAuthMember,
  uploader_member.single("mb_image"),
  memberController.updateMember
);

// Product related routers
router.post(
  "/products",
  memberController.retrieveAuthMember,
  productController.getAllProducts
);

router.get(
  "/products/:id",
  memberController.retrieveAuthMember,
  productController.getChosenProduct
);

router.post(
  "/products/edit_discount/:id",
  // brandController.validateAuthBrand,
  productController.updateChosenProductDiscount
);
// Brand related routers
router.get(
  "/brands",
  memberController.retrieveAuthMember,
  brandController.getBrands
);

router.get(
  "/brands/:id",
  memberController.retrieveAuthMember,
  brandController.getChosenBrand
);

// Order related routers
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);

router.get(
  "/orders",
  memberController.retrieveAuthMember,
  orderController.getMyOrders
);

router.post(
  "/orders/edit",
  memberController.retrieveAuthMember,
  orderController.editChosenOrder
);

// Community related routers

router.post(
  "/community/image",
  uploader_community.single("community_image"),
  communityController.imageInsertion
);

router.post(
  "/community/create",
  memberController.retrieveAuthMember,
  communityController.createArticle
);

router.get(
  "/community/articles",
  memberController.retrieveAuthMember,
  communityController.getMemberArticles
);

router.get(
  "/community/target",
  memberController.retrieveAuthMember,
  communityController.getArticles
);

router.get(
  "/community/single-article/:art_id",
  memberController.retrieveAuthMember,
  communityController.getChosenArticle
);

router.get(
  "/community/article/delete/:art_id",
  memberController.retrieveAuthMember,
  communityController.getArticleDelete
);

// Following related routers

router.post(
  "/follow/subscribe",
  memberController.retrieveAuthMember,
  followController.subscribe
);

router.post(
  "/follow/unsubscribe",
  memberController.retrieveAuthMember,
  followController.unsubscribe
);

router.get("/follow/followings", followController.getMemberFollowings);

router.get(
  "/follow/followers",
  memberController.retrieveAuthMember,
  followController.getMemberFollowers
);

// Comment related routers

router.post(
  "/comment/create",
  memberController.retrieveAuthMember,
  commentController.createComment
);

router.get(
  "/comment/target",
  memberController.retrieveAuthMember,
  commentController.getComments
);

router.get(
  "/comment/target/delete/:comment_id",
  memberController.retrieveAuthMember,
  commentController.getCommentDelete
);

router.post("/new/", commentController.getCommentDelete);

module.exports = router;
