const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createItem, getItems, deleteItem } = require("../controllers/itemController");

router.post("/items", upload.array('images', 5), createItem);
router.get("/items", getItems);
router.delete("/items/:id", deleteItem);

module.exports = router;
