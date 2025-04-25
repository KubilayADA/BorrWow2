const express = require("express");
const Item = require("../models/Item.model");
const router = express.Router();

router.get("/ssr-page", async (req, res) => {
  try {
    
    const items = await Item.find().limit(5); 
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
          <title>SSR Welcoming Page</title>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to BorrWow!</h1>
            <p>Here are some items available for borrowing:</p>
            <ul>${itemList}</ul>
            <button onclick="handleGoBack()" style="margin-top: 20px; padding: 10px 20px; background-color: #224eff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
              Go Back
            </button>
          </div>
          <script>
            function handleGoBack() {
              window.location.href = 'https://borrwow2-1-jqmk.onrender.com/';
            }
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error rendering SSR page:", error);
    res.status(500).send("Failed to load the page.");
  }
});

module.exports = router;