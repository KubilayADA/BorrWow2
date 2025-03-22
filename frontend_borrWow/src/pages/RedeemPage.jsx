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
      // minus the trust points 
      const updatedUser = { ...user, trustpoints: user.trustpoints - item.cost };
      setUser(updatedUser); // Update local state

      try {
        // trustpoints on the backend
        await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ trustpoints: updatedUser.trustpoints }),
        });

        // success notification
        toast.success(`Congratulations! You've successfully redeemed ${item.name}.`);
      } catch (error) {
        console.error("Error updating user trust points:", error);
        toast.error("There was an error processing your redemption.");
      }
    } else {
      // notification if not enough points
      toast.error(`Oops! You don’t have enough points to redeem ${item.name}.`);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">
        Redeem Your BorrWower Points: invite more friends to earn more points or redeem more items
      </Title>
      <Text size="xl" mb="xl" weight={500}>
        Current Balance: {user?.trustpoints || 0} Points
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
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
