import { Router } from "express";
import productsController from "../controllers/usersController.js";
import requestDetailsLogger from "../middlewares/requestDetailsLogger.js";
const router = Router();

router.post("/", requestDetailsLogger, productsController.createProduct);
router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProductById);
router.patch("/:id", productsController.updateProductById);
router.delete("/:id", productsController.deleteProductById);

export default router;
