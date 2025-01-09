// ProfileCard.jsx
import React from "react";
import { Card, Image, Text } from "@mantine/core";
import styles from "../styles/ProfileCard.module.css"; // Import CSS module

function ProfileCard({ user }) {
  // Define the placeholder image URL
  const placeholderImage =
    "https://imgs.search.brave.com/C-UIp7kXF_5QPP3lsw0Xgy8i1KqZlQJrdPn3o9yCbmI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYW5jaG9yLzEy/OC9pbWFnZS5wbmc";

  // Format the signup date
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageWrapper}>
          <Image
            src={user.imageUrl || placeholderImage}
            alt={user.username}
            radius="md"
            className={styles.profileImage} // Apply CSS class
          />
        </div>
        <div className={styles.details}>
          <Text size="xl" weight={500} className={styles.itemName}>
            Hello, {user.username}!
          </Text>
          <Text className={styles.description}>Email: {user.email}</Text>
          <Text className={styles.description}>Signed up: {formattedDate}</Text>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
