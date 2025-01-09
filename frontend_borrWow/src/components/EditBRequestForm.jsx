import React, { useContext } from "react";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { TextInput, Button, Checkbox, Group } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import styles from "../styles/AddItemForm.module.css";

function EditBRequestForm({ request, onClose, onSave }) {
  const { token } = useContext(SessionContext);

  const form = useForm({
    initialValues: {
      pickupDate: request?.pickupDate
        ? new Date(request.pickupDate)
        : new Date(),
      returnDate: request?.returnDate
        ? new Date(request.returnDate)
        : new Date(),
      pickupLocation: request?.pickupLocation || "",
      returnLocation: request?.returnLocation || "",
      termsOfService: request?.termsOfService || false,
    },
    validate: {
      pickupDate: (value) => (value ? null : "Pickup date is required"),
      returnDate: (value) => (value ? null : "Return date is required"),
      pickupLocation: (value) => (value ? null : "Pickup location is required"),
      returnLocation: (value) => (value ? null : "Return location is required"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update borrow request:", errorText);
        throw new Error("Failed to update borrow request");
      }

      // Trigger onSave callback after successful update
      onSave(); // Ensure this triggers a refresh or update
    } catch (error) {
      console.error("Error updating borrow request:", error);
    }
  };

  return (
    <form className={styles.container} onSubmit={form.onSubmit(handleSubmit)}>
      <DatePicker
        type="range"
        label="Select Date Range"
        value={[form.values.pickupDate, form.values.returnDate]}
        onChange={(dates) => {
          if (dates && dates.length === 2) {
            form.setValues({
              pickupDate: dates[0],
              returnDate: dates[1],
            });
          }
        }}
        classNames={{ input: styles.datePicker }}
      />

      <TextInput
        withAsterisk
        label="Pickup Location"
        placeholder="Enter Pickup Location"
        {...form.getInputProps("pickupLocation")}
      />

      <TextInput
        withAsterisk
        label="Return Location"
        placeholder="Enter Return Location"
        {...form.getInputProps("returnLocation")}
      />

      <Checkbox
        mt="md"
        label="Agree to terms"
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </form>
  );
}

export default EditBRequestForm;
