const express = require("express");
const router = express.Router();

const { ResUsers } = require("../models");
const HandleFunctionFactory = require("../factory");

const { get, getList, create, edit } = new HandleFunctionFactory(ResUsers);

router.get("/:id", get);

router.get("/", getList);

router.post("/", create);

router.put("/:id", edit);

module.exports = router;
