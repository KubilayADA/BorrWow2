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
      React.createElement("div", { className: "navbar", key: 1 }, [
        React.createElement(
          "a",
          { href: "/", key: 1 },
          "Home"
        ),
        React.createElement(
          "a",
          { href: "/about", key: 2 },
          "About"
        ),
        React.createElement(
          "a",
          { href: "/invitefriends", key: 3 },
          "Invite Friends"
        ),
      ]),
      React.createElement("div", { className: "container", key: 2 }, [
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
      ]),
    ]),
  ]);
}

module.exports = SSRPage;