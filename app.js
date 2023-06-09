const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const communityRouter = require("./routes/communityRoute");
const authExtractor = require("./middleware/authExtractor");

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// app.use("/api/Login", authRouter);
// app.use("/api/signup", authRouter);
app.use("/api/auth", authRouter);
app.use("/api/c/", authExtractor, communityRouter);

//Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
