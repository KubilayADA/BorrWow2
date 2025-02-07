
const express = require("express");


const logger = require("morgan");


const cookieParser = require("cookie-parser");


const cors = require("cors");

const FRONTEND_URL =
process.env.ORIGIN ||
"https://borrwow2-1-jqmk.onrender.com"; // Default to localhost for development

// Middleware configuration
module.exports = (app) => {
  
  app.set("trust proxy", 1);


  app.use(
    cors({
      origin: FRONTEND_URL, // Allow your frontend origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
      credentials: true, // Include credentials (if needed)
    })
  );

 
  app.use(logger("dev"));


  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
