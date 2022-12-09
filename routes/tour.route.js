import express from "express"
import TourController from "../controllers/tour.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const TourRouter = express.Router()

TourRouter.route("/")
    .post(AuthMiddleware.requireUser, TourController.bookTour)
    .get(AuthMiddleware.requireAdmin, TourController.getTours)
TourRouter.get("/user", AuthMiddleware.requireUser, TourController.getToursByUser)
TourRouter.put("/inspect", AuthMiddleware.requireAdmin, TourController.assignGuider)
TourRouter.get("/statisticTour/:from/:to", AuthMiddleware.requireAdmin, TourController.statisticTourByMonth)
TourRouter.get("/:tourId", AuthMiddleware.requireAdmin, TourController.getTourById)

export default TourRouter;