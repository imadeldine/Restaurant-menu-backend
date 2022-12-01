import express from "express";
const router = express.Router();

import CategoryController from "../controllers/CategoryController.js";

router.get("/", CategoryController.getCategory);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;