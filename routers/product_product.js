const express = require("express");
const router = express.Router();

const { ProductProduct } = require("../models");
const HandleFunctionFactory = require("../factory");

const { get, getList, create, edit, destroy } = new HandleFunctionFactory(ProductProduct);

router.get("/:id", get);

router.get("/", getList);

router.post("/", create);

router.put("/:id", edit);

router.delete("/:id", destroy);

module.exports = router;
