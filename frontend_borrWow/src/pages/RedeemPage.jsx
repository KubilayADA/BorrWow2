import React, { useContext, useState, useEffect } from "react";
import { Container, Title, Card, Text, Button } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { toast } from "react-toastify";

function RedeemPage() {
  const { isAuthenticated, userId, token } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Use temporary items until proper endpoint is created
        const mockItems = [
          { id: 1, name: "Premium Toolset", cost: 50 },
          { id: 2, name: "Gardening Kit", cost: 75 },
          { id: 3, name: "DIY Starter Pack", cost: 100 },
        ];
        setItems(mockItems);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load redeemable items");
      }
    };

    fetchItems();
  }, []);

  // Modified handleRedeem function
  const handleRedeem = async (itemId) => {
    try {
      const item = items.find((item) => item.id === itemId);
      if (!item) {
        toast.error("Invalid item selection");
        return;
      }

      if (!user || user.trustpoints < item.cost) {
        toast.error(`Not enough points for ${item.name}`);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: item.id, itemCost: item.cost }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Redemption failed");
      }

      setUser(data.user);
      toast.success(`Successfully redeemed ${item.name}!`);
    } catch (error) {
      toast.error(error.message);
      console.error("Redemption error:", error);
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
