const express = require("express");
const storeRouter = require("./store.route");

const appRouter = express.Router();

appRouter.use("/", storeRouter);

module.exports = appRouter;
