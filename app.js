const express = require("express");
const dataRouter = require("./routes/dataRoute");

const app = express();
app.use(express.json());

app.use('/api/v1/data',dataRouter);

module.exports = app;