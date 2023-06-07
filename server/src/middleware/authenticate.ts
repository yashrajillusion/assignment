require("dotenv").config();
const jwt = require("jsonwebtoken");
import express, { NextFunction, Request, Response, Router } from "express";

const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, user: any) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const authenticate = async (req: any, res: any, next: NextFunction) => {
  const access_token = req.headers?.authorization;
  if (!access_token)
    return res
      .status(401)
      .send({ auth: false, message: "unauthorised request" });

  let token = access_token.split(" ")[1];
  let user: any;
  try {
    user = await verifyToken(token);
  } catch (error) {
    return res
      .status(401)
      .send({ auth: false, message: "Authorization token invalid" });
  }
  req.user = user.user;
  return next();
};

module.exports = { authenticate, verifyToken };
