import React from "react";
import { Container, Text, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Import the image
import styles from "../styles/LandingPage.module.css"; // Import CSS module

function LandingPage() {
  return (
    <Container className={styles.container}>
      <Center className={styles.center}>
        {/* Image above the title */}
        <img src={logo} alt="Logo" className={styles.logo} />
        <div>
          <Text align="center" mt="md">
            <strong>Welcome to borrWow.</strong> A local platform to share,
            help, and lend more than a hand. Join our community now!
          </Text>
          <Center mt="lg">
            <Link to="/login" className={styles.loginLink}></Link>
          </Center>
        </div>
      </Center>
    </Container>
  );
}

export default LandingPage;
