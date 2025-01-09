import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemListCard from "../components/ItemListCard";
import styles from "../styles/SearchResultsPage.module.css";

const SearchResultsPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items/search?query=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Search Results</h1>
      {items.length > 0 ? (
        <div className={styles.resultsContainer}>
          {items.map((item) => (
            <ItemListCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
