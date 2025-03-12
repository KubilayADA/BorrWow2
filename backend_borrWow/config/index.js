const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URLS = [
  "https://borrwow2-1-jqmk.onrender.com",
  "http://localhost:5173",
  "https://borrwow2-8w5m.onrender.com",
  ...(process.env.ORIGIN ? process.env.ORIGIN.split(",") : []),
].map(url => url.replace(/\/$/, ""));

module.exports = (app) => {
  app.set("trust proxy", 2); // Trust Render proxies

  app.options("*", cors()); // Preflight handling

  app.use(
    cors({
      origin: (origin, callback) => {
        console.log("Received Origin:", origin);
        const normalizedOrigin = origin?.replace(/\/$/, "") || "";
        if (FRONTEND_URLS.includes(normalizedOrigin)) {
          callback(null, origin); // Reflect exact origin
        } else {
          callback(new Error("CORS blocked"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};