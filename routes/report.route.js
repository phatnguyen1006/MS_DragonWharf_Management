import express from "express"
import ReportController from "../controllers/report.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const ReportRouter = express.Router()

ReportRouter.route("/")
    .post(ReportController.submitReport)
    .get(AuthMiddleware.requireAdmin, ReportController.getReports)
ReportRouter.get("/search", AuthMiddleware.requireAdmin, ReportController.searchReport)
ReportRouter.get("/:reportId", ReportController.getReportById)

export default ReportRouter;