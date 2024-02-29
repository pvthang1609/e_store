const sequelize = require("../config/sequelize");

const ProductProduct = require("./product_product");
const ResUsers = require("./res_users");
const SaleOrder = require("./sale_order");
const SaleOrderLine = require("./sale_order_line");
const IrAttachment = require("./ir_attachment");

SaleOrder.hasMany(SaleOrderLine, {
    foreignKey: "saleOrderId",
});
SaleOrderLine.belongsTo(SaleOrder, {
    foreignKey: "saleOrderId",
});

ProductProduct.hasOne(SaleOrderLine, {
    foreignKey: "productId",
});
SaleOrderLine.belongsTo(ProductProduct, {
    foreignKey: "productId",
});

ResUsers.hasOne(SaleOrder, {
    foreignKey: "userId",
});
SaleOrder.belongsTo(ResUsers, {
    foreignKey: "userId",
});

IrAttachment.hasOne(ResUsers, {
    foreignKey: "attachmentId",
});
ResUsers.belongsTo(IrAttachment, {
    foreignKey: "attachmentId",
});

sequelize.sync().then(() => {
    console.log("Database & tables synced");
});

module.exports = {
    ProductProduct,
    ResUsers,
    SaleOrder,
    SaleOrderLine,
    IrAttachment,
};
