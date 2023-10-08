const express = require("express");
const appRouter = require("./src/routes/index");
const app = express();
var cors = require('cors')
app.use(express.json());

app.use(cors())
app.use('/api/v1',appRouter);

module.exports=app;