import AppError from "../utils/appError.js";

const authorize = (roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};

export default authorize;
