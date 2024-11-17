import LocationController from "@controllers/LocationController.js";
import { Router } from "express";

const router = Router();

// router.get("/", LocationController.getUser);
router.post("/", LocationController.createLocation);

// router.get("/:id", LocationController.getUser);
// router.patch("/:id", LocationController.updateUser);
// router.delete("/:id", LocationController.deleteUser);

export { router };
