const sequelize = require("../config/db");

const User = require("./User");
const Item = require("./Item");
const Category = require("./Category");
const Image = require("./Image");
const Message = require("./Message");
const SwapProposal = require("./SwapProposal");

User.hasMany(Item);
Item.belongsTo(User);

Category.hasMany(Item);
Item.belongsTo(Category);

Item.hasMany(Image,    { foreignKey: "itemId" });
Image.belongsTo(Item,  { foreignKey: "itemId" });

Message.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiver_id" });

SwapProposal.belongsTo(Message, { foreignKey: "message_id" });
SwapProposal.belongsTo(Item, { as: "offeredItem", foreignKey: "offered_item_id" });
SwapProposal.belongsTo(Item, { as: "requestedItem", foreignKey: "requested_item_id" });

module.exports = {
  sequelize,
  User,
  Item,
  Category,
  Image,
  Message,
  SwapProposal,
};
