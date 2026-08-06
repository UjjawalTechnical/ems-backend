import express from "express";
import { login, verify } from "../controllers/authContoller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { addDepartment } from "../controllers/departmentController.js";

const route = express.Router()

route.post('/login', login)
route.post("/verify", authMiddleware, verify)
route.post("/departments", authMiddleware, addDepartment)

export default route;