const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

require('dotenv').config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Lentelės sukurtos ir DB prijungta");
    app.listen(PORT, () => {
      console.log(`🚀 Serveris veikia: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Klaida jungiantis prie DB:", err.message);
  });
