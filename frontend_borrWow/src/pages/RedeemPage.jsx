// RedeemPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { Container, Title, Card, Text, Button } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { toast } from "react-toastify";

function RedeemPage() {
  const { isAuthenticated, userId, token } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: "Soundbar", cost: 50 },
    { id: 2, name: "VR set", cost: 2000 },
    { id: 3, name: "XBOX Series X", cost: 3000 },
  ]);

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
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, userId, token]);

  const handleRedeem = async (itemId) => {
    const item = items.find((item) => item.id === itemId);
    if (user?.trustpoints >= item.cost) {
      // Process the redemption (you can add your redeem logic here)
      toast.success(`Congratulations! You've successfully redeemed ${item.name}.`);
    } else {
      toast.error(`Oops! You don’t have enough points to redeem ${item.name}.`);
    }
  };
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Redeem Your BorrWower Points: invite more friends to earn more points or BorrWow more items
      </Title>
      <Text size="xl" mb="xl" weight={500}>
        Current Balance: {user?.trustpoints || 0} Points
      </Text>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map((item) => (
          <Card key={item.id} shadow="sm" padding="lg">
            <Title order={3}>{item.name}</Title>
            <Text size="sm" c="dimmed" mt="sm">
              Cost: {item.cost} points
            </Text>
            <Button 
              fullWidth 
              mt="md"
              disabled={!user || user.trustpoints < item.cost}
              onClick={() => handleRedeem(item.id)}
            >
              Redeem
            </Button>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default RedeemPage;