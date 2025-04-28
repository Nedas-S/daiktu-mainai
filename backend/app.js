const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// Middleware'ai
app.use(cors());
app.use(express.json());

// 👇 Static failai
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");

app.use("/api", userRoutes);
app.use("/api", itemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API veikia!");
});

module.exports = app;
