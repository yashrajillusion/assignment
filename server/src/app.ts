import "dotenv/config";
import express, { json } from "express";

const app = express();
const PORT = process.env.PORT;
let server = app.listen(PORT, async (): Promise<void> => {
    try {

    } catch (error) {
      console.log(error);
    }
    console.log(`Listening on Port ${PORT}`);
  });

