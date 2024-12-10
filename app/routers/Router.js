const express = require("express");
const { UserRoutes } = require("./UserRoutes");
const { AddressRoutes } = require("./AddressRoutes");
const { CategoryRoutes } = require("./CategoryRoutes");
const { ProductRoutes } = require("./ProductRouter");
const { ProductDetailRoutes } = require("./ProductDetailRoutes");
const { ProductAttributeRoutes } = require("./ProductAttributeRoutes");
const { ProductSuggestionRoutes } = require("./ProductSuggestionRoutes");
const { ProductBasketRoutes } = require("./ProductBasketRoutes");

const router = express.Router();

router.use("/User", UserRoutes);
router.use("/Address", AddressRoutes);
router.use("/Category", CategoryRoutes);
router.use("/Product", ProductRoutes);
router.use("/ProductDetail", ProductDetailRoutes);
router.use("/ProductAttribute", ProductAttributeRoutes);
router.use("/ProductSuggestion", ProductSuggestionRoutes);
router.use("/ProductBasket", ProductBasketRoutes);

module.exports = { Routes: router };
