const express = require("express");
const router = express.Router();

const { SaleOrderLine, ProductProduct } = require("../models");
const HandleFunctionFactory = require("../factory");

const { get, getList, create, edit } = new HandleFunctionFactory(SaleOrderLine);

router.get("/debug", async (req, res, next) => {
    const saleOrderLineId = await SaleOrderLine.findByPk(1, { include: ProductProduct });
    res.send(saleOrderLineId);
});

router.get("/:id", get);

router.get("/", getList);

router.post("/", create);

router.put("/:id", edit);

module.exports = router;
