const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

/* BODY PARSER */
app.use(express.json());

/* CORS */
app.use(cors());

/* SECURITY */
app.use(helmet());

/* LOGGER */
app.use(morgan("dev"));

/* RATE LIMITER */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running Successfully",
  });
});

/* ROUTES */
app.use("/api/health", healthRoutes);

app.use("/api/auth", authRoutes);

/* 404 */
app.use(notFoundMiddleware);

/* GLOBAL ERROR */
app.use(errorMiddleware);

module.exports = app;