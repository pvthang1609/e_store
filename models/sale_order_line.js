const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const SaleOrder = require("./sale_order");
const ProductProduct = require("./product_product");

const SaleOrderLine = sequelize.define("sale_order_line", {
    amount: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
        },
    },
});

module.exports = SaleOrderLine;
