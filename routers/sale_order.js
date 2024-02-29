const express = require("express");
const router = express.Router();

const { SaleOrder, SaleOrderLine, ResUsers } = require("../models");
const HandleFunctionFactory = require("../factory");

const { get, getList, create, edit } = new HandleFunctionFactory(SaleOrder);

router.get("/debug", async (req, res, next) => {
    const saleOrderId = await SaleOrder.findOne({
        where: {
            id: 1,
        },
        include: [SaleOrderLine, ResUsers],
    });
    res.send(saleOrderId);
});

router.get("/:id", get);

router.get("/", getList);

router.post("/", create);

router.put("/:id", edit);

module.exports = router;
