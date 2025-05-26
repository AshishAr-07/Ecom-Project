import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileCOntroller,
  getAllordersController,
  getOrderController,
  orderStatusController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);

//Login || Post
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);

//forgot password || POST
router.post("/forgotpassword", forgotPasswordController);

router.put("/profile", requireSignIn, updateProfileCOntroller);

//user orders

router.get("/orders", requireSignIn, getOrderController);

router.get("/all-orders", requireSignIn, isAdmin, getAllordersController);

router.post("/order-status/:orderId", requireSignIn,isAdmin, orderStatusController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



export default router;
