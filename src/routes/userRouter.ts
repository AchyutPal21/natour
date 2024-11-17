import userController from "@controllers/UserController.js";
import { validateId } from "@middlewares/param/validateId.js";
import { Router } from "express";

const router = Router();

// Param middleware
router.param("id", validateId("USER"));

router.get("/", userController.getUser);
router.post("/", userController.registerUser);

router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export { router };
