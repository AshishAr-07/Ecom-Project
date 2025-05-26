import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController} from "../controller/categoryController.js";
const router = express.Router();

// create category route

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
  );

  router.get(
    "/single-category/:slug",
    requireSignIn,
    isAdmin,
    singleCategoryController
  );

  router.get(
    "/getcategory",
    requireSignIn,
    categoryController
  );

  router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
  );


export default router;
