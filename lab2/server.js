import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import postsRoutes from "./routes/postsRoute.js";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// body parser
// app.use: application level middleware , parses the request body to the json format
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ws://localhost:${PORT}`);
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
    });
});
