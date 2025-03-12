
require("dotenv").config();


const express = require("express");

const app = express();


require("./config")(app);


const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);


require("./error-handling")(app);

module.exports = app;
