const express = require("express");
const Item = require("../models/Item.model");
const router = express.Router();

router.get("/ssr-page", async (req, res) => {
  try {
    const items = await Item.find().limit(5);
    const itemList = items
      .map(
        (item) => `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.itemname}</h5>
            <p class="card-text">${item.description}</p>
          </div>
        </div>`
      )
      .join("");

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>SSR Welcoming Page</title>
         
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f9f9f9;
            }
            .container {
              text-align: center;
              max-width: 800px;
              margin: auto;
            }
            .card {
              border: 1px solid #ddd;
              border-radius: 8px;
              margin: 10px 0;
              padding: 15px;
              background-color: #fff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .card-title {
              font-size: 1.2rem;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .card-text {
              font-size: 1rem;
              color: #555;
            }
            button {
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #224eff;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            button:hover {
              background-color: #1a3bcc;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to BorrWow!</h1>
             <h2> THIS PAGE CREATED TO DEMONSTRATE KNOWLEDGE OF SSR TO MEET THE REQUIREMENTS OF THE PROJECT </h2>
            <p>Here are some items available for borrowing:</p>
            <p> This page renders on the server side and displays dynamically changing data </p>
            ${itemList}
            <button onclick="handleGoBack()">Go Back</button>
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