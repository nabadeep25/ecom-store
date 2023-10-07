const express = require("express");
const storeRouter = require("./store.route");
const adminRouter = require("./admin.route");

const appRouter = express.Router();

appRouter.use("/", storeRouter);
 appRouter.use("/admin", adminRouter);

module.exports = appRouter;
