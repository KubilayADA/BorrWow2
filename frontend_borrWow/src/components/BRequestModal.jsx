import React, { useState, useContext } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import "@mantine/dates/styles.css";

const BRequestModal = ({ itemId, modalOpened, setModalOpened }) => {
  const { token, userId } = useContext(SessionContext);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");

  const handleRequest = async () => {
    try {
      if (!token) {
        throw new Error("No authentication token");
      }

      const values = {
        pickupDate: dateRange[0],
        returnDate: dateRange[1],
        pickupLocation,
        returnLocation,
        itemId,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is correctly included
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("YOU CANT BORROW YOUR OWN ITEMS");
      }

      const data = await response.json();
      console.log("Borrow request created:", data);
      navigate("/requestedByYOU");
      setModalOpened(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      title="BorrWow it!"
    >
  <DatePicker
  type="range"
  allowSingleDateInRange
  label="Select Date Range"
  value={dateRange}
  onChange={setDateRange}
  renderDay={(date) => {
    const start = dateRange[0];
    const end = dateRange[1];
    
    const isInRange =
      start && end && date >= new Date(start) && date <= new Date(end);
    
    return (
      <div
        style={{
          backgroundColor: isInRange ? "#224eff" : "transparent", // Keep selected range blue
          color: isInRange ? "white" : "black",
          borderRadius: "8px",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        {date.getDate()}
      </div>
    );
  }}
/>
      <TextInput
        label="Pickup Location"
        color="#224eff"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.currentTarget.value)}
      />
      <TextInput
        label="Return Location"
        color="#224eff"
        value={returnLocation}
        onChange={(e) => setReturnLocation(e.currentTarget.value)}
      />
      <Button onClick={handleRequest} fullWidth color="#224eff" mt="md">
        Submit Request
      </Button>
    </Modal>
  );
};

export default BRequestModal;
