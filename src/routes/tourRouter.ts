import tourController from "@controllers/TourController.js";
import { catchAsync } from "@middlewares/exceptions/catchAsyncHandler.js";
import { aliasTourQuery } from "@middlewares/tours/aliasTourQuery.js";
import { Router } from "express";

const router = Router();

// =>                               MIDDLEWARES
// router.param("id", validateId("TOUR"));
// Default Query as per requirements
router.get(
  "/top-5-cheap-tours",
  aliasTourQuery("", "price,-ratingsAverage", "", "5"),
  catchAsync(tourController.getTours)
);

router.get(
  "/top-5-latest-tours",
  aliasTourQuery("", "-price,-createdAt", "", "5"),
  catchAsync(tourController.getTours)
);

// =>                               AGGREGATED STATISTICS
router.get("/tours-stats", catchAsync(tourController.toursStats));
router.get(
  "/tours-yearly-plan/:year",
  catchAsync(tourController.toursYearlyPlan)
);

// =>                               APPLICATION ROUTES
router.get("/", catchAsync(tourController.getTours));
router.post("/", catchAsync(tourController.addTour));
router.get("/:id", catchAsync(tourController.getTour));
router.patch("/:id", catchAsync(tourController.updateTour));
router.delete("/:id", catchAsync(tourController.deleteTour));

export { router };
