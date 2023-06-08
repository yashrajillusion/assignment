import "dotenv/config";
import express, { json } from "express";
import connection from "./config/db";

const admin = require("firebase-admin");
const credentials = require("./firebasekey.json");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(json());

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://fir-crud-auth-4af2c-default-rtdb.firebaseio.com",
});

export const auth = admin.auth();

const userController = require("../src/controller/user.controller");
const orderController = require("../src/controller/order.controller");
const { authenticate } = require("./middleware/authenticate");
app.use("/auth", userController);
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
