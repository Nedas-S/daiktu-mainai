const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/itemController");

// POST /api/items
router.post("/", upload.array("images", 5), createItem);
// GET  /api/items
router.get("/", getItems);
// DELETE /api/items/:id
router.delete("/:id", deleteItem);

module.exports = router;
