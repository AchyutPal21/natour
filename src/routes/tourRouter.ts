import tourController from "@controllers/TourController.js";
import { Router } from "express";

const router = Router();

// router.param("id", validateId("TOUR"));

router.get("/:id", tourController.getTour);
router.get("/", tourController.getTours);
router.post("/", tourController.addTour);
router.patch("/:id", tourController.updateTour);
router.delete("/:id", tourController.deleteTour);

export { router };
