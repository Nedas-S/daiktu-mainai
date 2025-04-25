const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ČIA PRIJUNGIAM MARŠRUTUS
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes); // šita eilutė būtinai turi būti

app.get("/", (req, res) => {
  res.send("✅ API veikia!");
});

module.exports = app;
