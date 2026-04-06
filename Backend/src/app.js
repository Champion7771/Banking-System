const express = require("express");
const authRoutes = require("./routes/auth.routes");
const recordRoutes = require("./routes/record.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./utils/errorHandler");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// const protect = require("./middlewares/auth.middleware");

const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests, try again after 1 minute"
    });
  }
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorHandler);

// app.get("/api/protected", protect, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

module.exports = app;
