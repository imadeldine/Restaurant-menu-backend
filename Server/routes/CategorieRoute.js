import express from "express";
const router = express.Router();

import CategorieController from "../Controllers/CategorieController.js";

router.get("/", CategorieController.getCategorie);
router.post("/", CategorieController.createCategorie);
// router.put("/:id", CategorieController.updateCategorie);
// router.delete("/:id", CategorieController.deleteCategorie);

export default router;