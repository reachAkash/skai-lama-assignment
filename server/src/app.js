const express = require("express");
const morgan = require("morgan");
const { errorResponse } = require("./utils/responseHelper");
const router = require("./routes/index.routes");
const cors = require("cors");

// configurations
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://skai-lama-assignment-akash.vercel.app",
    ],
  })
);

// route configuration
app.use("/api/v1", router);

// handling non-existential routes
app.use("*", (req, res, next) => {
  return errorResponse(res, 401, "Page not found!");
});

// global error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
});

module.exports = { app };
