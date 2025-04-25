require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models"); // importuoja iš models/index.js

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true }) // sukuria arba atnaujina lenteles
  .then(() => {
    console.log("✅ Lentelės sukurtos ir DB prijungta");
    app.listen(PORT, () => {
      console.log(`🚀 Serveris veikia: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Klaida jungiantis prie DB:", err.message);
  });
const express = require("express");
const router = express.Router();
const { registerUser } = require("./controllers/userController");

router.post("/register", registerUser);

module.exports = router;
