const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const SSRPage = require("../src/SSRPage");

const router = express.Router();


router.get("/ssr-page", (req, res) => {
  const html = ReactDOMServer.renderToString(React.createElement(SSRPage));
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SSR Page</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});

module.exports = router;