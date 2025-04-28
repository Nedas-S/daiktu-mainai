require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Auth (register/login) – jokio tokeno nereikia
app.use("/api", userRoutes);

// Item routes – visiems /api/items/* reikia token’o
app.use("/api/items", authMiddleware, itemRoutes);

// Health-check
app.get("/", (req, res) => res.send("✅ API veikia!"));

module.exports = app;
