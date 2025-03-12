const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Improved origin handling with regex support
const FRONTEND_URLS = [
  process.env.FRONTEND_URL, // Single env variable
  "http://localhost:5173",
  /\.onrender\.com$/, // Regex for all Render subdomains
  /^https?:\/\/localhost(:\d+)?$/ // Localhost with any port
].filter(Boolean); // Remove empty values

module.exports = (app) => {
  app.set("trust proxy", 2);

  // Enhanced CORS configuration
  const corsOptions = {
    origin: (origin, callback) => {
      console.log("Received Origin:", origin);
      
      // Allow requests with no origin (server-to-server, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check against allowlist
      const isAllowed = FRONTEND_URLS.some(pattern => {
        if (pattern instanceof RegExp) return pattern.test(origin);
        return origin === pattern.replace(/\/$/, "");
      });

      isAllowed ? callback(null, true) : callback(new Error("CORS blocked"));
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
  };

  // Apply CORS middleware first
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions)); // Preflight for all routes

  // Rest of middleware
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Add health check endpoint
  app.get("/", (req, res) => res.status(200).json({ status: "healthy" }));
};