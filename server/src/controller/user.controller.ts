require("dotenv").config();
const jwt = require("jsonwebtoken");
import express, { Request, Response, Router } from "express";
import { generateResponse } from "../utils/helper";

const router = express.Router();
const User = require("../model/user.model");

const newToken = (user: any) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

router.post("/add-user", async (req: Request, res: Response) => {
  try {
    let current_user = await await User.findOne({
      phone_number: req.body.phone_number,
    })
      .lean()
      .exec();
    if (current_user)
      return res
        .status(404)
        .send(generateResponse(404, "Phone number already exist", {}));

    current_user = await User.create(req.body);

    const access_token = newToken(current_user);

    return res.status(201).send(
      generateResponse(201, "Account created register successfully", {
        user: current_user,
        access_token,
      })
    );
  } catch (err: any) {
    return res.status(500).send(generateResponse(500, err.message, {}));
  }
});

router.post("/login-user", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ phone_number: req.body.phone_number });
    if (!user) {
      return res
        .status(404)
        .send(generateResponse(404, "Phone number not found", {}));
    }

    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res
        .status(404)
        .send(generateResponse(404, "Incorrect Password", {}));
    }
    const access_token = newToken(user);

    return res.status(200).send(
      generateResponse(200, "Login successfull", {
        user: user,
        access_token,
      })
    );
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
