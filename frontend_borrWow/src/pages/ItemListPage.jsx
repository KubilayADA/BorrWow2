import React, { useEffect, useState, useContext } from "react";
import ItemListCard from "../components/ItemListCard";
import styles from "../styles/ItemListPage.module.css";
import headerImage from "../assets/images/header.png";
import { SessionContext } from "../contexts/SessionContext";

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useContext(SessionContext); // Use session context to get user ID

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    const fetchItems = async () => {
      console.log("Fetching items..."); // Log when fetching starts
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
        console.log("Response:", response); // Log the response object
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data

        // Filter items based on availability and ownership
        const visibleItems = data.filter(
          (item) =>
            item.availability === "Available" ||
            (userId && item.owner && userId === item.owner._id.toString())
        );
        console.log("Filtered items:", visibleItems); // Log the filtered items

        setItems(visibleItems);
        setFilteredItems(visibleItems);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(visibleItems.map((item) => item.category)),
        ];
        console.log("Categories:", uniqueCategories); // Log categories
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching items:", error); // Log any errors
        setError(error.message);
      }
    };

    fetchItems();
  }, [userId]); // useEffect dependency array

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === category));
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <img src={headerImage} alt="Header" className={styles.headerImage} />
      <div className={styles.categoryLinks}>
        <button onClick={() => handleCategoryClick("All")}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className={styles.container}>
        {filteredItems.map((item) => (
          <ItemListCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemListPage;
