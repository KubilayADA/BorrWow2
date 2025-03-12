import React from "react";
import { Container, Text, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Import the image
import styles from "../styles/LandingPage.module.css"; // Import CSS module
import cash from "../assets/images/cash.png";

function LandingPage() {
  return (
    <Container className={styles.container}>
      <Center className={styles.center}>
        {/* Logo */}
        <img src={logo} alt="Logo" className={styles.logo} />

        <div>
          <Text align="center" mt="md">
            <strong>Welcome to borrWow.</strong> A local platform to share,
            help, and lend more than a hand. Join our community now!
          </Text>

          {/* Invite Box Section */}
          <div className={styles.box}>
            <img src={cash} alt="Invite" className={styles.cash} />
            <div className={styles.boxText}>
              <p className={styles.invite}>
                <strong>Invite friends now</strong> and get €30 BorrWower Cash
                for each friend that joins! Each friend also gets 1 month free.
                It’s a win-win!
              </p>
              <Link to="/invitefriends">
                <button className={styles.button}>Find out more</button>
              </Link>
            </div>
          </div>
        </div>
      </Center>
    </Container>
  );
}

export default LandingPage;
