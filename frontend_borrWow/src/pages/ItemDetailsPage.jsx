import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mantine/core";
import styles from "../styles/ItemDetailsPage.module.css";
import { SessionContext } from "../contexts/SessionContext";
import BRequestModal from "../components/BRequestModal";

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ItemDetailsPage = () => {
  const { id } = useParams();
  console.log('Item ID:', id);
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [user, setUser] = useState(null);
  const { userId, token, isAuthenticated } = useContext(SessionContext);

  useEffect(() => {
    console.log('Fetching item...');
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items/${id}`
        );
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.includes(id));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      if (item && item.owner) {
        console.log("Owner ID:", item.owner._id);  // Log the owner ID to check if it's valid        
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/${item.owner._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchUser();
  }, [item, token]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorites = isFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleReturnClick = () => {
    const previousPage = localStorage.getItem("previousPage") || "/items";
    navigate(previousPage);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the item.");
      }
      navigate("/items");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.details}>
          <div className={`${styles.categoryLabel} ${styles[item.category]}`}>
            {toTitleCase(item.category)}
          </div>
          <div className={styles.itemNameContainer}>
            <h2 className={styles.itemName}>{item.itemname}</h2>
            <p className={styles.status}>{item.availability}</p>
          </div>
          <p className={styles.location}>Location: {item.location}</p>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.owner}>
            {user && user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.username}
                className={styles.ownerImage}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} size="2x" />
            )}
            <p>{user ? user.username : "Unknown"}</p>
          </div>
          <div className={styles.buttonContainer}>
            {isAuthenticated && (
              <Button
                variant="filled"
                color="#224eff"
                className={styles.button}
                onClick={() => setModalOpened(true)}
              >
                Request to BorrWow
              </Button>
            )}
            <Button
              variant="outline"
              color="#224eff"
              className={styles.button}
              onClick={handleReturnClick}
            >
              Return
            </Button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {isAuthenticated && (
            <button
              className={`${styles.favoriteBtn} ${
                isFavorite ? styles.active : ""
              }`}
              onClick={handleFavoriteClick}
              aria-label="Toggle favorite"
            >
              ♥
            </button>
          )}
          <img
            src={item.imageUrl}
            alt={item.itemname}
            className={styles.image}
          />
          {token &&
            userId &&
            item.owner &&
            userId === item.owner._id.toString() && (
              <div className={styles.editDeleteContainer}>
                <Button
                  variant="filled"
                  color="#224eff"
                  className={styles.button}
                  onClick={() => navigate(`/edit/${id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  className={styles.button}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            )}
        </div>

        <BRequestModal
          itemId={id}
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
    </div>
  );
};

export default ItemDetailsPage;
