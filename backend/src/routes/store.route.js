const express = require("express");
const {
  addToUserCart,
  checkout,
  getItems,
  getCart,
} = require("../controllers/store.controller");
const storeRouter = express.Router();

storeRouter.post("/add-to-cart", addToUserCart);
storeRouter.post("/checkout", checkout);
storeRouter.get("/items", getItems);
storeRouter.get("/cart", getCart);
module.exports = storeRouter;
