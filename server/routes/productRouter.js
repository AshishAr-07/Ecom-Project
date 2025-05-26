import express from "express";
import {
  braintreePaymentController,
  braintreeTokenCOntroller,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCOuntController,
  productFilterController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all product
router.get("/getproduct", getProductController);

//get single product
router.get("/getproduct/:slug", getSingleProductController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

// get photo
router.get("/getphoto/:pid", productPhotoController);

// filter product
router.post("/product-filters", productFilterController);

// product count
router.get("/product-count", productCOuntController);

// product list based on page
router.get("/product-list/:page", productListController);

//payment routes
// token
router.get("/braintree/token", braintreeTokenCOntroller);

// payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
