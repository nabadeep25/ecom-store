const express = require("express");
const appRouter = require("./src/routes/index");
const app = express();

app.use(express.json());

app.use('/api/v1',appRouter);

module.exports=app;