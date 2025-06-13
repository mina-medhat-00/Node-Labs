import { Router } from "express";
import requestDetailsLogger from "../middlewares/requestDetailsLogger.js";
import postsController from "../controllers/postsController.js";
const router = Router();

router.post("/", requestDetailsLogger, postsController.createPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.patch("/:id", postsController.updatePostById);
router.delete("/:id", postsController.deletePostById);

export default router;
