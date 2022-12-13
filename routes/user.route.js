import express from "express"
import UserController from "../controllers/user.controller.js"
import AuthMiddleware from "../middlewares/auth.middleware.js"

const UserRouter = express.Router()

UserRouter.post("/register", UserController.register)
UserRouter.post("/login", UserController.login)
UserRouter.route("/")
    .get(AuthMiddleware.requireUser, UserController.getUserInfo)
    .put(AuthMiddleware.requireUser, UserController.updateUserInfo)
UserRouter.post("/refresh-token", UserController.refreshToken)
UserRouter.get("/list", AuthMiddleware.requireAdmin, UserController.getUserList)
UserRouter.get("/profile/:id", AuthMiddleware.requireAdmin, UserController.getUserById)
UserRouter.get("/search", AuthMiddleware.requireAdmin, UserController.searchUser)
UserRouter.post("/create", AuthMiddleware.requireAdmin, UserController.addUser)
UserRouter.delete("/:id", AuthMiddleware.requireAdmin, UserController.deleteUser)
UserRouter.put("/update-info", AuthMiddleware.requireAdmin, UserController.updateUserInfo_Admin)

export default UserRouter;