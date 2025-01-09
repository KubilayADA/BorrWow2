import React from "react";
import { Button, Paper, Title, Text, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">404</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center">
          Page Not Found
        </Title>
        <Text align="center" mt="md">
          Oops! The page you are looking for cannot be found.
        </Text>
        <Button
          fullWidth
          mt="xl"
          color="#224eff"
          onClick={handleGoBack}
        >
          Go back to Home
        </Button>
      </Paper>
    </Container>
  );
}

export default ErrorPage;
