
require("dotenv").config();


const express = require("express");

const app = express();


require("./config")(app);


const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

const ssrRoutes = require("./routes/ssr.welcomingPage.routes");
app.use("/api", ssrRoutes);

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);


require("./error-handling")(app);

module.exports = app;

