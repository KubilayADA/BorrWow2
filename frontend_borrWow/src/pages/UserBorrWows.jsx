import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SimpleGrid,
  Card,
  Image,
  Text,
  Button,
} from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import styles from "../styles/ItemListCard.module.css"; // Import the styles used in ItemListCard

function UserBorrWows() {
  const [userItems, setUserItems] = useState([]);
  const { token } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items/user/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        setUserItems(data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchUserItems();
  }, [token]);

  const handleEdit = (itemId) => {
    navigate(`/edit/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUserItems(userItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container className={styles.container}>
      <h2>Your BorrWows</h2>
      <SimpleGrid cols={3} spacing="lg">
        {userItems.map((item) => {
          const {
            itemname,
            description,
            category,
            location,
            availability,
            _id,
            imageUrl,
          } = item;

          const truncatedDescription =
            description.length > 140
              ? `${description.substring(0, 140)}...`
              : description;

          const formattedCategory = category
            .toLowerCase()
            .replace(/ & /g, "-and-")
            .replace(/ /g, "-")
            .replace(/[^a-z0-9-]/g, "");

          const statusClass = `${styles.status} ${styles[availability]}`;

          return (
            <Card key={_id} shadow="sm" className={styles.card}>
              <Card.Section>
                <Image
                  src={imageUrl}
                  height={160}
                  alt={itemname}
                  className={styles.image}
                />
              </Card.Section>
              <div className={styles.details}>
                <div className={styles.itemNameContainer}>
                  <h2 className={styles.itemName}>{itemname}</h2>
                  <p className={statusClass}>{availability}</p>
                </div>
                <p className={styles.description}>{truncatedDescription}</p>
                <p className={styles.location}>Location: {location}</p>
                <div className={styles.buttonContainer}>
                  <Button
                    onClick={() => handleEdit(_id)}
                    variant="outline"
                    color="#224EFF"
                    size="xs"
                    className={styles.button}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(_id)}
                    variant="outline"
                    color="red"
                    size="xs"
                    className={styles.button}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}

export default UserBorrWows;
