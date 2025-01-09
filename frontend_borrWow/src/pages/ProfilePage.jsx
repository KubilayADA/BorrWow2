import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { TextInput, Button, Container } from "@mantine/core";
import ProfileCard from "../components/ProfileCard"; // Import the ProfileCard component
import styles from "../styles/ProfilePage.module.css"; // Import CSS module

function ProfilePage() {
  const { userId, token } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
        setUsername(data.username || "");
        setEmail(data.email || "");
        setImage(data.imageUrl || "");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleUpdate = async () => {
    const body = JSON.stringify({ username, imageUrl: image, email });
    console.log(body); // Log the body before making the request

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      alert("Profile updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <Container className={styles.pageContainer}>
      <div className={styles.profileSection}>
        <ProfileCard user={user} className={styles.profileCard} />
        <div className={styles.editableInfo}>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className={styles.textInput}
          />
          <TextInput
            label="Profile Image URL"
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
            className={styles.textInput}
          />
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className={styles.textInput}
          />
          <Button onClick={handleUpdate} color="#224eff">
            Update Profile
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;
