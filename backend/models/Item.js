const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Item = sequelize.define("Item", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  create_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Item;
