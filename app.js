const express = require("express");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./Utils/appError");
const authRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

const app = express();
app.use(express.json());

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use("/api/Login", authRouter);
app.use("/api/signup", authRouter);


//Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
