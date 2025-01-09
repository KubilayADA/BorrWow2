import React from "react";
import AddItemForm from "../components/AddItemForm";
import { Container, Title, Text, Center } from "@mantine/core";
import styles from "../styles/CreateNewItemPage.module.css";

function CreateNewItemPage() {
  return (
    <>
      <Container className={styles.container}>
        <Center className={styles.center}>
          <Title align="center">Create a new BorrWow!</Title>
        </Center>
      </Container>
      <Container className={styles.formContainer}>
        <AddItemForm />
      </Container>
    </>
  );
}

export default CreateNewItemPage;
