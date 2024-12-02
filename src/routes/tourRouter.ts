import tourController from "@controllers/TourController.js";
import { aliasTourQuery } from "@middlewares/tours/aliasTourQuery.js";
import { Router } from "express";

const router = Router();

// =>                               MIDDLEWARES
// router.param("id", validateId("TOUR"));
// Default Query as per requirements
router.get(
  "/top-5-cheap-tours",
  aliasTourQuery("", "price,-ratingsAverage", "", "5"),
  tourController.getTours
);

router.get(
  "/top-5-latest-tours",
  aliasTourQuery("", "-price,-createdAt", "", "5"),
  tourController.getTours
);

// =>                               APPLICATION ROUTES
router.get("/", tourController.getTours);
router.post("/", tourController.addTour);
router.get("/:id", tourController.getTour);
router.patch("/:id", tourController.updateTour);
router.delete("/:id", tourController.deleteTour);

export { router };
