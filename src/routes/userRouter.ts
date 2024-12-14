import userController from "@controllers/UserController.js";
import { catchAsync } from "@middlewares/exceptions/catchAsyncHandler.js";
import { validateId } from "@middlewares/param/validateId.js";
import { Router } from "express";

const router = Router();

// Param middleware
router.param("id", validateId("USER"));

router.get("/", userController.getUser);
router.post("/auth/signup", catchAsync(userController.registerUser));
router.get("/auth/verify-email", catchAsync(userController.verifyUserEmail));

router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export { router };
