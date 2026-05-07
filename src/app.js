const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const healthRoutes = require("./routes/health.routes");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use("/api/health", healthRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;