const React = require("react");

function SSRPage() {
  return React.createElement("html", null, [
    React.createElement("head", { key: 1 }, [
      React.createElement("title", { key: 1 }, "SSR Welcoming Page"),
      React.createElement("link", {
        key: 2,
        rel: "stylesheet",
        href: "/api/ssr-page-styles", 
      }),
    ]),
    React.createElement("body", { key: 2 }, [
      React.createElement("div", { className: "container", key: 1 }, [
        React.createElement(
          "h1",
          { key: 1 },
          "This is an SSR WELCOMING PAGE"
        ),
        React.createElement(
          "p",
          { key: 2 },
          "This page is only made for showing knowledge of SSR."
        ),
        React.createElement(
          "p",
          { key: 3 },
          "Rendered on the server for SE_19!"
        ),
        
        React.createElement(
          "button",
          {
            key: 4,
            onClick: "history.back()", 
            style: {
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#224eff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            },
          },
          "Go Back"
        ),
      ]),
    ]),
  ]);
}

module.exports = SSRPage;