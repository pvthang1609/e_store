const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

const SaleOrder = sequelize.define("sale_order", {
    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
});

module.exports = SaleOrder;
