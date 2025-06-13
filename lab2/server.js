import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
// body parser
// app.use: application level middleware , parses the request body to the json format
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ws://localhost:${PORT}`);
  mongoose
    .connect("mongodb://localhost:27017/iti-lab")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
    });
});
