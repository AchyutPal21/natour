import { Router } from "express";
import { validateId } from "../middlewares/param/validateId.js";

const router = Router();

router.param("id", validateId("TOUR"));

// router.get("/", getTours);
// router.post("/", addTour);

// router.get("/:id", getTour);
// router.patch("/:id", updateTour);
// router.delete("/:id", deleteTour);

export { router };
