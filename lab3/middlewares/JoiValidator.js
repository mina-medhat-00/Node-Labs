import AppError from "../utils/AppError.js";

const JoiValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      const errMsg = error.details[0].message;
      throw new AppError(errMsg, 400);
    }
    next();
  };
};

export default JoiValidator;
