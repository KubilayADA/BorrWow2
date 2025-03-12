const express = require("express");
const app = express();
const apiRouter = require("./routes/api.routes"); // Your existing API router


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});


app.use("/api", apiRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;