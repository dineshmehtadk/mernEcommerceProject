const express = require("express");
const { getAllProducts, createProduct , updateProduct, deleteProduct, getProductDetails, createProductReview, getAdminProducts, getProductReviews, deleteReview} = require("../controller/productController");
const { getUserDetails } = require("../controller/userController");
const { isAuthenticatedUser, autharizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts)
router.route("/admin/product/new").post(isAuthenticatedUser,createProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser,autharizeRole("admin"),updateProduct)
.delete(isAuthenticatedUser,autharizeRole("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/admin/products").get(isAuthenticatedUser,autharizeRole("admin"), getAdminProducts)
router
  .route("/reviews")
  .get(getProductReviews).delete(isAuthenticatedUser, deleteReview);


module.exports = router;