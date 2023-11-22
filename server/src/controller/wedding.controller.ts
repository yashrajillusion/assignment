import express, { Request, Response } from "express";
import { generateResponse } from "../utils/helper";
const Wedding = require("../model/wedding.model");

export const createWedding = async (req: Request, res: Response) => {
  try {
    let order = await Wedding.create(req.body);

    return res
      .status(201)
      .send(generateResponse(201, "Webiste Created", order));
  } catch (err: any) {
    return res.status(500).send(generateResponse(500, err.message, {}));
  }
};

export const getWeddingByPhone = async (req: any, res: Response) => {
  try {
    let wedding = await Wedding.findOne({ phone_number: req.query.user })
      .lean()
      .exec();

    if (!wedding) {
      return res.status(400).send(generateResponse(400, "Not Found", {}));
    }

    return res
      .status(200)
      .send(generateResponse(200, "Wedding fetched successfully", wedding));
  } catch (error: any) {
    return res.status(500).send(generateResponse(500, error.message, {}));
  }
};

export const updateWedding = async (req: any, res: Response) => {
  try {
    let wedding = await Wedding.findOneAndUpdate(
      { phone_number: req.query.user },
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    if (!wedding) {
      return res.status(400).send(generateResponse(400, "Not Found", {}));
    }

    return res
      .status(200)
      .send(generateResponse(200, "Wedding Updated successfully", wedding));
  } catch (error: any) {
    return res.status(500).send(generateResponse(500, error.message, {}));
  }
};
