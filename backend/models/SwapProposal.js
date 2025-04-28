const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SwapProposal = sequelize.define("SwapProposal", {
  status: {
    type: DataTypes.STRING, 
    defaultValue: "pending",
  },
});

module.exports = SwapProposal;
