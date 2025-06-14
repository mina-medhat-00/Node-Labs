import AppError from "../utils/AppError.js";

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};

export default authorize;
// higher order functions => return middleware function
