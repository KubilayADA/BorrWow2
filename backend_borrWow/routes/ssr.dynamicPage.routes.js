const express = require("express");
const Item = require("../models/Item.model");
const router = express.Router();

router.get("/ssr-dynamic", async (req, res) => {
  try {
    const items = await Item.find().limit(5); // Fetch some items from the database
    const itemList = items
      .map(
        (item) => `
        <li>
          <strong>${item.itemname}</strong>: ${item.description}
        </li>`
      )
      .join("");

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Dynamic SSR Page</title>
        </head>
        <body>
          <h1>Dynamic Items List</h1>
          <ul>${itemList}</ul>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send("Error rendering page");
  }
});

module.exports = router;