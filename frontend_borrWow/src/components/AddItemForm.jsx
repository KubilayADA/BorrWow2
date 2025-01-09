import React from "react";
import { Select, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddItemForm.module.css";

function AddItemForm() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      itemname: "",
      description: "",
      category: "",
      availability: "",
      location: "", // Field for location
      termsOfService: false,
      imageUrl: "", // Field for image URL
    },
    validate: {
      itemname: (value) => (value ? null : "Item name is required"),
      description: (value) => (value ? null : "Description is required"),
      category: (value) => (value ? null : "Category is required"),
      availability: (value) => (value ? null : "Availability is required"),
      location: (value) => (value ? null : "Location is required"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to create item:", error);
        throw new Error("Failed to create item");
      }

      const data = await response.json();
      console.log("Item created:", data);
      navigate("/items");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Berlin districts in alphabetical order
  const berlinDistricts = [
    "Charlottenburg",
    "Friedrichshain",
    "Kreuzberg",
    "Lichtenberg",
    "Mitte",
    "Neukölln",
    "Pankow",
    "Schöneberg",
    "Wedding",
    "Köpenick",
  ];

  return (
    <form
      className={styles.container}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <TextInput
        withAsterisk
        label="Item name"
        placeholder="What do you want to BorrWow out?"
        {...form.getInputProps("itemname")}
      />
      <TextInput
        withAsterisk
        label="Description"
        placeholder="How would you describe what you could BorrWow out?"
        {...form.getInputProps("description")}
      />
      <Select
        label="Category"
        withAsterisk
        placeholder="Select the category"
        data={[
          { value: "Electronics", label: "Electronics" },
          { value: "Beauty", label: "Beauty" },
          { value: "Music", label: "Music" },
          { value: "Clothes", label: "Clothes" },
          { value: "Rooms & Facilities", label: "Rooms & Facilities" },
          { value: "Outdoor Area", label: "Outdoor Area" },
          { value: "Acts of Service", label: "Acts of Service" },
          { value: "Vehicles", label: "Vehicles" },
        ]}
        {...form.getInputProps("category")}
      />
      <Select
        label="Availability"
        withAsterisk
        placeholder="Do you want people to see this BorrWow?"
        data={[
          { value: "Available", label: "Available" },
          { value: "Hidden", label: "Hidden" },
        ]}
        {...form.getInputProps("availability")}
      />
      <Select
        label="Location"
        withAsterisk
        placeholder="Select the location"
        data={berlinDistricts.map((district) => ({
          value: district,
          label: district,
        }))}
        {...form.getInputProps("location")}
      />
      <TextInput
        label="Image URL"
        placeholder="Enter the image URL"
        {...form.getInputProps("imageUrl")}
      />
      <Checkbox
        mt="md"
        label="Agree to terms"
        color="#224EFF"
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" color="#224EFF">
          Submit
        </Button>
      </Group>
    </form>
  );
}

export default AddItemForm;
