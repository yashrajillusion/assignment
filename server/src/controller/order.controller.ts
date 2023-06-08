import express, { Request, Response, Router } from "express";
import { generateResponse } from "../utils/helper";
const router = express.Router();
const Order = require("../model/order.model");

router.post("/add-order", async (req: Request, res: Response) => {
  try {
    let order = await Order.create(req.body);

    return res
      .status(201)
      .send(generateResponse(201, "Order created successfully", order));
  } catch (err: any) {
    return res.status(500).send(generateResponse(500, err.message, {}));
  }
});

router.get("/get-order", async (req: any, res: Response) => {
  try {
    let order = await Order.find({ user_id: req.query.user_id }).lean().exec();

    if (req.user._id !== req.query.user_id) {
      return res
        .status(401)
        .send(generateResponse(401, "unauthorised request", order));
    }

    return res
      .status(200)
      .send(generateResponse(200, "Order fetched successfully", order));
  } catch (error: any) {
    return res.status(500).send(generateResponse(500, error.message, {}));
  }
});

module.exports = router;
