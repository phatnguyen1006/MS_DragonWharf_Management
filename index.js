import express from "express"
import connectDB from "./config/config.js"
import cors from "cors"

import UserRouter from "./routes/user.route.js";
import ReportRouter from "./routes/report.route.js";
import AdminRouter from "./routes/admin.route.js";
import TourRouter from "./routes/tour.route.js";

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 8000;

// Routes
app.use("/user", UserRouter)
app.use("/report", ReportRouter)
app.use("/admin", AdminRouter)
app.use("/tour", TourRouter)

app.get("/", (req, res) => {
    res.status(200).json({message: "Hello from management"})
})

app.use("/*", (req, res) => {
    res.status(404).json({message: "Page not found!"})
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
}).setTimeout(60*1000);
