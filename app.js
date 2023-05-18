const express = require("express");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./Utils/appError");
const dataRouter = require("./routes/dataRoute");

const app = express();
app.use(express.json());

app.use('/api/v1/data',dataRouter);

//Error handling
app.all("*",(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);


module.exports = app;