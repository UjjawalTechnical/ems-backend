import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addDepartment, deleteDepartment, getDepartmentById, getDepartments, updateDepartment } from "../controllers/departmentController.js";

const route = express.Router()

route.post("/add-departments", authMiddleware, addDepartment)
route.get("/get-departments", authMiddleware, getDepartments)
route.get("/get-department/:id", authMiddleware, getDepartmentById)
route.put("/update-department/:id", authMiddleware, updateDepartment)
route.delete("/delete-department/:id", authMiddleware, deleteDepartment)

export default route;
