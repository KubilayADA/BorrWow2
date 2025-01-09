import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css"; // Import CSS module

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div>
        <a
          href="https://github.com/hannakayes/frontend_borrWow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend Repository
        </a>
        |
        <a
          href="https://github.com/mariamagneu/backend_borrWow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Backend Repository
        </a>
      </div>
      <div>&copy; {currentYear} BorrWow. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
