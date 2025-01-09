import React, { useState, useEffect } from "react";
import ItemListCard from "../components/ItemListCard";
import styles from "../styles/FavoritesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch all items
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();

    // Retrieve favorite IDs from local storage
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoriteIds);
  }, []);

  // Function to handle favorite changes
  const handleFavoriteChange = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Filter items to include only favorites
  const favoriteItems = items.filter((item) => favorites.includes(item._id));

  return (
    <div className={styles.page}>
      <h1 className={styles.headline}>You'd probably like to borrWow these.</h1>
      <div className={styles.itemsContainer}>
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <ItemListCard
              key={item._id}
              item={item}
              onFavoriteChange={handleFavoriteChange}
            />
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
