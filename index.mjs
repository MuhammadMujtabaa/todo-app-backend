import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes/index.mjs";
import mongoose from "mongoose";

dotenv.config();

const App = express();
const PORT = process.env.PORT || 5000;

App.use(express.json());
App.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    App.listen(PORT, () => console.log(`App is running on PORT:`, PORT));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
