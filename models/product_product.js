const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProductProduct = sequelize.define("product_product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT(6, 2),
    },
});

module.exports = ProductProduct;
