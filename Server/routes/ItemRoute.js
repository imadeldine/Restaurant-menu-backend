import express from "express";
const router = express.Router();

import ItemController from "../Controllers/ItemController.js";

router.get("/", ItemController.getItem);
router.post("/", ItemController.createItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

export default router;