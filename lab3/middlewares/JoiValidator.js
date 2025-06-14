import AppError from "../utils/appError.js";

const joiValidator = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      const errMsg = error.details[0].message;
      throw new AppError(errMsg, 400);
    }
    next();
  };
};

export default joiValidator;
