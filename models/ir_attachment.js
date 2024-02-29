const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const IrAttachment = sequelize.define("ir_attachment", {
    fieldName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    encoding: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    resModel: {
        type: DataTypes.STRING,
    },
    resId: {
        type: DataTypes.INTEGER,
    },
});

module.exports = IrAttachment;
