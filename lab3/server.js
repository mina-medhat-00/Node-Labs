import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import hpp from "hpp";
import { xss } from "express-xss-sanitizer";
import { sanitizeMongoInput } from "express-v5-mongo-sanitize";
import "dotenv/config.js";
import usersRoutes from "./routes/usersRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";
import limiter from "./middlewares/rateLimiter.js";

const app = express();

// // pug , ejs , setup view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// body parser
// app.use => application level middleware , parses the request body to the json format
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(sanitizeMongoInput);
app.use(xss());
app.use(hpp());

// routes
// health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/api/v1/users", usersRoutes);

// 404 error handler , always put it after all the routes
app.use((req, res, next) => {
  // res.render("404");
  next(new AppError("Route not found", 404));
});

// global error middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`✅✅ Server is running on port ${process.env.PORT}`);
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("✅✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.log("❌❌ Error connecting to MongoDB", err);
    });
});
