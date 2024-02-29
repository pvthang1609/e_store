const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_db", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize;
