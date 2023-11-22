import { Router } from "express";
import { registerUser, signInUser } from "../controller/user.controller";
import {
  createUserOrder,
  getUserOrdersByUserId,
} from "../controller/order.controller";
import {
  createWedding,
  getWeddingByPhone,
  updateWedding,
} from "../controller/wedding.controller";
const router = Router();
const { authenticate } = require("../middleware/authenticate");

router.route("/add-user").post(registerUser);
router.route("/login-user/:login_by").post(signInUser);
router.route("/get-order").get(authenticate, getUserOrdersByUserId);
router.route("/add-order").post(authenticate, createUserOrder);
router.route("/wedding").post(createWedding);
router.route("/wedding").get(getWeddingByPhone);
router.route("/wedding").put(updateWedding);

export default router;
