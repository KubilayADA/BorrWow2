import React, { useContext, useState } from "react";
import { Select, Button, TextInput, Checkbox, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import styles from "../styles/AddItemForm.module.css";

function CreateBRequestForm() {
  const { token, userId } = useContext(SessionContext); // Get userId from context
  const navigate = useNavigate();
  const { id } = useParams(); 

  const form = useForm({
    initialValues: {
      location: "",
      termsOfService: false,
    },
  });

  const handleRequest = async () => {
    console.log("Token:", token);

    try {
      if (!token) {
        throw new Error("No authentication token");
      }

      const values = {
        pickupDate: dateRange[0],
        returnDate: dateRange[1],
        pickupLocation,
        returnLocation,
      };

      console.log("Values being sent:", values);

      const bodyData = JSON.stringify({
        ...values,
        item: id,
      });

      console.log("Serialized body data:", bodyData);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create borrow request");
      }

      const data = await response.json();
      console.log("Borrow request created:", data);
      navigate("/requestedByYOU");
      setModalOpened(false); // Close modal after successful request
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <DatePicker
        type="range"
        allowSingleDateInRange
        label="Select Date Range"
        value={dateRange}
        onChange={setDateRange}
        classNames={{ input: modalStyles.datePicker }}
      />
      <TextInput
        label="Pickup Location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.currentTarget.value)}
        classNames={{ input: modalStyles.textInput }}
      />
      <TextInput
        label="Return Location"
        value={returnLocation}
        onChange={(e) => setReturnLocation(e.currentTarget.value)}
        classNames={{ input: modalStyles.textInput }}
      />
      <Button onClick={handleRequest} fullWidth mt="md">
        Submit Request
      </Button>
    </form>
  );
}

export default CreateBRequestForm;
