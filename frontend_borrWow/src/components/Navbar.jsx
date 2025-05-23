import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import styles from "../styles/Navbar.module.css";
import handshakeBlue from "../assets/images/handshake_blue.png";
import handshakeBlack from "../assets/images/handshake_black.png";
import { SessionContext } from "../contexts/SessionContext";
import SearchBar from "./SearchBar";
import { Burger } from '@mantine/core'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, userId, token, handleLogout } =
    useContext(SessionContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    if (isAuthenticated && userId) {
      fetchUser();
    }

    return () => controller.abort();
  }, [isAuthenticated, userId, token]);

  return (
          <div className={styles.navbar}>
            <Burger
        opened={isMenuOpen} 
        onClick={() => setIsMenuOpen((o) => !o)}
        className={styles.burger}
      />
      <Link to="/" className={styles.navLink}>
        <img
          src={handshakeBlue}
          alt="Home"
          className={styles.navImage}
          onMouseEnter={(e) => (e.currentTarget.src = handshakeBlack)}
          onMouseLeave={(e) => (e.currentTarget.src = handshakeBlue)}
        />
        
      </Link>
      {isMenuOpen && (
  <div className={styles.mobileMenu}>
    <Link to="/about" className={styles.mobileLink}>ABOUT</Link>
    <Link to="/invitefriends" className={styles.mobileLink}>INVITE</Link>
    <Link to="/items" className={styles.mobileLink}>BORROW</Link>
    <Link
  to={`${import.meta.env.VITE_API_URL}/api/ssr-page`}
  className={styles.ssrLink}
  target="_blank"
  rel="noopener noreferrer">
  SSR PAGE
</Link>
    {isAuthenticated && user && (
      <Link to="/redeem" className={styles.mobileLink}>
        POINTS: {user.trustpoints || 0}
      </Link>
    )}
    {isAuthenticated && (
      <>
        <Link to="/favorites" className={styles.mobileLink}>FAVORITES</Link>
        <Link to="/newitem" className={styles.mobileLink}>SHARE</Link>
      </>
    )}
  </div>
)}

      <div className={styles.leftSideLinks}>
        <Link to="/about" className={styles.aboutLink}>
          ABOUT
        </Link>
        <Link to="/invitefriends" className={styles.inviteLink}>
          INVITE
        </Link>
        <Link to="/items" className={styles.borrowLink}>
          BORROW
        </Link>
        <Link
        to={`${import.meta.env.VITE_API_URL}/api/ssr-page`}
        className={styles.ssrLink}
        target="_blank"
        rel="noopener noreferrer">
        SSR PAGE
        </Link>
       {isAuthenticated && user && (
        <Link to="/redeem" className={styles.pointsLink}>
       POINTS : {user.trustpoints || 0}
              </Link>
)}
      
        {isAuthenticated && (
          <>
            <Link to="/favorites" className={styles.favoritesLink}>
              FAVORITES
            </Link>
            <Link to="/newitem" className={styles.shareLink}>
              SHARE
            </Link>
          </>
        )}
      </div>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.buttonContainer}>
        {!isAuthenticated ? (
          <>
            <Button
              component={Link}
              to="/login"
              variant="outline"
              color="#224eff"
              className={styles.button}
            >
              Log In
            </Button>
            
            <Button
              component={Link}
              to="/signup"
              variant="filled"
              color="#224eff"
              className={styles.button}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/userdash"
              variant="outline"
              color="#224eff"
              className={styles.button}
            >
              <div className={styles.userInfo}>
                {user ? `${user.username}` : "Dashboard"}
              </div>
            </Button>
            <Button
              onClick={handleLogout}
              variant="filled"
              color="#224eff"
              className={styles.button}
            >
              Log Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
