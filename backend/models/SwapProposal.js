const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SwapProposal = sequelize.define("SwapProposal", {
  status: {
    type: DataTypes.STRING, // pvz.: pending, accepted, rejected
    defaultValue: "pending",
  },
});

module.exports = SwapProposal;
