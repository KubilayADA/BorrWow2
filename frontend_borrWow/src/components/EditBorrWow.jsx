import React, { useState, useEffect, useContext } from "react";
import { Select, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "../styles/EditBorrWow.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function EditBorrWow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(SessionContext);

  const [itemData, setItemData] = useState(null);

  const form = useForm({
    initialValues: {
      itemname: "",
      description: "",
      category: "",
      availability: "",
      location: "",
      imageUrl: "",
      termsOfService: false,
    },
    validate: {
      itemname: (value) => (value ? null : "Item name is required"),
      description: (value) => (value ? null : "Description is required"),
      category: (value) => (value ? null : "Category is required"),
      availability: (value) => (value ? null : "Availability is required"),
      location: (value) => (value ? null : "Location is required"),
    },
  });

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Failed to fetch item data:",
            response.status,
            errorText
          );
          throw new Error("Failed to get item info");
        }

        const data = await response.json();
        setItemData(data);

        form.setValues({
          itemname: data.itemname || "",
          description: data.description || "",
          category: data.category || "",
          availability: data.availability || "",
          location: data.location || "",
          imageUrl: data.imageUrl || "",
          termsOfService: data.termsOfService || false,
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id, token]);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${id}`,
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
        console.error("Failed to update item:", errorText);
        throw new Error("Failed to update item");
      }

      navigate(`/items/${id}`);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

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
    <div className={styles.container}>
      <form
        className={styles.form}
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
        <Group className={styles.buttons} justify="flex-end" mt="md">
          <Button
            type="button"
            color="#224eff"
            variant="outline"
            onClick={() => navigate(`/items/${id}`)}
          >
            Return
          </Button>
          <Button type="submit" color="#224eff">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default EditBorrWow;
