import { Router } from "express";
import usersController from "../controllers/usersController.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import JoiValidator from "../middlewares/JoiValidator.js";
import registerSchema from "../utils/schemas/registerSchema.js";
import loginSchema from "../utils/schemas/loginSchema.js";

const router = Router();

// register
router.post(
  "/register",
  JoiValidator(registerSchema),
  usersController.register
);

// login
router.post("/login", JoiValidator(loginSchema), usersController.login);

// get all users
router.get(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  usersController.getAllUsers
);
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

export default router;
