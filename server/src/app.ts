import "dotenv/config";
import express, { json } from "express";
import connection from "./config/db";

const app = express();
app.use(json());

const userController = require("../src/controller/user.controller");
const orderController = require("../src/controller/order.controller");
app.use("/", userController);
app.use("/", orderController);

const PORT = process.env.PORT;
let server = app.listen(PORT, async (): Promise<void> => {
  try {
    connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on Port ${PORT}`);
});
