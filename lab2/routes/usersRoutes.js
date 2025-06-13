import { Router } from "express";
import usersController from "../controllers/usersController.js";
import requestDetailsLogger from "../middlewares/requestDetailsLogger.js";
const router = Router();

router.post("/", requestDetailsLogger, usersController.createUser);
router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

export default router;
