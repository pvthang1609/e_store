"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "product_products",
            [
                {
                    name: "Product 01",
                    code: "P01",
                    price: 13000000,
                    weight: 3.5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Product 02",
                    code: "P02",
                    price: 33000000,
                    weight: 1.5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Product 03",
                    code: "P03",
                    price: 24000000,
                    weight: 0.5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
