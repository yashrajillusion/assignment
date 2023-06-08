import { Router } from "express";
import { registerUser, signInUser } from "../controller/user.controller";
import {
  createUserOrder,
  getUserOrdersByUserId,
} from "../controller/order.controller";
const router = Router();
const { authenticate } = require("../middleware/authenticate");

router.route("/add-user").post(registerUser);
router.route("/login-user/:login_by").post(signInUser);
router.route("/get-order").get(authenticate, getUserOrdersByUserId);
router.route("/add-order").post(authenticate, createUserOrder);

module.exports = router;
