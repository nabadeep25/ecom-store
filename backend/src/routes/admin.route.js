const express = require("express");
const {
  getDiscountCodes,
  getStoreStats,
} = require("../controllers/admin.controller");
const adminRouter = express.Router();

adminRouter.get("/discount-codes", getDiscountCodes);
adminRouter.get("/store-stats", getStoreStats);
module.exports = adminRouter;
