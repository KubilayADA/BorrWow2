import React, { useContext, useState, useEffect } from "react";
import { Container, Title, Card, Text, Button } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { toast } from "react-toastify";

function RedeemPage() {
  const { isAuthenticated, userId, token, isLoading } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!userId || isLoading) return; // Prevent fetching if userId is not set or loading

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load user data");
        }

        setUser(data);
      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const fetchItems = async () => {
      try {
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
  }, [userId, token, isLoading]);

  const handleRedeem = async (itemId) => {
    try {
      // Send redeem request to the backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          itemId: itemId,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to redeem item");
      }
  
      // Update user points after redemption
      setUser((prevUser) => ({
        ...prevUser,
        trustpoints: prevUser.trustpoints - items.find(item => item.id === itemId).cost,
      }));
  
      toast.success("Item redeemed successfully!");
    } catch (error) {
      console.error("Error redeeming item:", error);
      toast.error("Failed to redeem item");
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state until the user is ready
  }

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">
        Redeem Your BorrWower Points: OUR REDEEM PAGE IS CURRENTLY UNDER CONSTRUCTION. PLEASE CHECK BACK LATER.
      </Title>
      <Text size="xl" mb="xl" weight={500}>
        Current Balance: {user?.trustpoints || 0} Points
      </Text>
      {user && (
        <div>
          <Text size="lg">Username: {user.username}</Text>
        </div>
      )}

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
