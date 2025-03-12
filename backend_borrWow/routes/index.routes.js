const express = require("express");
const app = express();
const itemRouter = require("./routes/item.routes"); // Your existing API router


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});


app.use("/items", itemRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;