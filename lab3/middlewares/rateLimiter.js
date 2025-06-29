import rateLimit from "express-rate-limit";
import AppError from "../utils/appError.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false,
  handler: () => {
    throw new AppError("Too many requests, please try again later.", 429);
  },
});

export default limiter;
