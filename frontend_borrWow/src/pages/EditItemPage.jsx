import React from "react";
import { Container, Title } from "@mantine/core";
import EditBorrWow from "../components/EditBorrWow"; // Import your component
import styles from "../styles/EditItemPage.module.css";

function EditItemPage() {
  return (
    <Container className={styles.pageContainer}>
      <Title order={1} className={styles.headerTitle}>
        Edit Your Item
      </Title>
      <EditBorrWow />
    </Container>
  );
}

export default EditItemPage;
