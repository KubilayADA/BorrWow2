const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = require("./config/cors.config"); // Update path as needed

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Rest of your middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes
const apiRouter = require("./routes/index.routes");
app.use("/api", apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    }
  });
});