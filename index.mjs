import dotenv from "dotenv";
import express from "express";
import helmet from "helmet"; // For basic security enhancements
import mongoose from "mongoose";
import { router } from "./src/routes/index.mjs";

dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.MONGO_URI || !process.env.PORT) {
  throw new Error("Missing necessary environment variables: MONGO_URI or PORT");
}

const app = express();
const PORT = process.env.PORT || 5000;

// Basic security enhancements
app.use(helmet());
app.use(express.json());
app.use(router);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });






// PORT
// MONGO_URI
// JWT_SECRET
// HOST
// PASS
// USER
// CLOUDINARY_CLOUD_NAME
// CLOUDINARY_API_KEY
// CLOUDINARY_API_SECRET
