const express = require("express");
const router = express.Router();

router.get("/ssr-page", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>SSR Welcoming Page</title>
      </head>
      <body>
        <div class="container">
          <h1>This is an SSR WELCOMING PAGE</h1>
          <p>This page is only made for showing knowledge of SSR.</p>
          <p>Rendered on the server for SE_19!</p>
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
});

module.exports = router;