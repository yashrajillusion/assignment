require("dotenv").config();
const jwt = require("jsonwebtoken");
import express, { Request, Response, Router } from "express";
import { generateResponse } from "../utils/helper";
import { auth } from "../app";

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

router.post("/login-user/:login_by", async (req: Request, res: Response) => {
  try {
    if (req.params.login_by === "google") {
      try {
        const google_user = await auth.getUser(req.body.google_uid);

        let dbUsers = await User.findOne({
          email: google_user.email,
          phone_number: null,
        });

        if (!dbUsers) {
          dbUsers = await User.create({
            email: google_user.email,
            password: req.body.google_uid,
            name: google_user.displayName ?? "",
          });
          const access_token = newToken(dbUsers);
          return res.status(201).send(
            generateResponse(201, "Account created register successfully", {
              user: dbUsers,
              access_token,
            })
          );
        }

        const access_token = newToken(dbUsers);

        return res.status(200).send(
          generateResponse(200, "Login successfull", {
            user: dbUsers,
            access_token,
          })
        );
      } catch (error) {
        console.log(error);
        return res
          .status(404)
          .send(
            generateResponse(
              404,
              "somenthing went wrong, Please try other email",
              {}
            )
          );
      }
    }

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
    return res.status(500).send(generateResponse(500, e.message, {}));
  }
});

module.exports = router;
