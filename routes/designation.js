import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addDesignation, deleteDesignation, getDesignationById, getDesignations, updateDesignation } from "../controllers/designationController.js";

const router = express.Router();

router.get("/get-designations", getDesignations);
router.get("/get-designation/:id", getDesignationById);
router.post("/add-designation", authMiddleware, addDesignation);
router.put("/update-designation/:id", authMiddleware, updateDesignation);
router.delete("/delete-designation/:id", authMiddleware, deleteDesignation);

export default router;