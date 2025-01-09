import React, { useState, useContext, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token, setToken, isLoading, isAuthenticated } =
    useContext(SessionContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/userdash");
    }
  }, [isAuthenticated, navigate]); // Removed token from dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password }),
        }
      );

      if (!loginResponse.ok) {
        const errorData = await loginResponse.text();
        throw new Error(errorData || "Login failed.");
      }

      const contentType = loginResponse.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await loginResponse.json();
        localStorage.setItem("authToken", data.token);
        setToken(data.token); // Update context token
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container size={420} my={40}>
      <Title align="center">Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextInput
            label="Username"
            placeholder="Your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            color="#224eff"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
