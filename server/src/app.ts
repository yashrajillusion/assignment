import "dotenv/config";
import express, { json } from "express";
import connection from "./config/db";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(json());

const userController = require("../src/controller/user.controller");
const orderController = require("../src/controller/order.controller");
const { authenticate } = require("./middleware/authenticate");
app.use("/", userController);
app.use("/", authenticate, orderController);

const PORT = process.env.PORT;
let server = app.listen(PORT, async (): Promise<void> => {
  try {
    connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on Port ${PORT}`);
});
