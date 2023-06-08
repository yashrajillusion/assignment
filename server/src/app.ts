import "dotenv/config";
import express, { json } from "express";
import connection from "./config/db";
import * as credentials from "./firebasekey.json";

const admin = require("firebase-admin");
import voosh_routes from "./routes/route";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(json());

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://fir-crud-auth-4af2c-default-rtdb.firebaseio.com",
});

export const auth = admin.auth();

app.use("/", voosh_routes);

const PORT = process.env.PORT;
let server = app.listen(PORT, async (): Promise<void> => {
  try {
    connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on Port ${PORT}`);
});
