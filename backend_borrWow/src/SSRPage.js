const React = require("react");

function SSRPage() {
  return React.createElement("div", null, [
    React.createElement("h1", { key: 1 }, "This is an SSR WELCOMING PAGE, this page only made for showing knowledge of SSR"),
    React.createElement("p", { key: 2 }, "Rendered on the server for SE_19!"),
  ]);
}

module.exports = SSRPage;