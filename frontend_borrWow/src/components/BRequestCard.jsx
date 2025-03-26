import React from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "../styles/BRequestCard.module.css";

const BRequestCard = ({
  request,
  onDelete,
  onEdit,
  token,
  isIncoming,
  onUpdate,
}) => {
  const {
    item,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation,
    status,
    _id,
  } = request;

  const navigate = useNavigate();

  // BRequestsTOUserPage.jsx
const handleUpdate = async () => {
  await fetchTORequests(); // Make sure to await the refresh
};

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      onDelete(_id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/${_id}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      onUpdate(); // Refresh data
    } catch (error) {
      console.error("Error accepting request", error);
    }
  };

  const handleDenyRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/${_id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to deny request");
      }
  
      onUpdate(); // Refresh the requests list
    } catch (error) {
      console.error("Error denying request", error);
    }
  };

  const handleCompleteRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/${_id}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete request");
      }

      onUpdate(); // Refresh data
    } catch (error) {
      console.error("Error completing request", error);
    }
  };

  const handleEditRequest = () => {
    onEdit(request);
  };

  const statusClass = `${styles.status} ${styles[status] || ""}`;

  return (
    <div className={styles.card}>
      {item && item.imageUrl && (
  <img src={item.imageUrl} alt={item.itemname || 'Item image'} className={styles.image} />
)}
      <div className={statusClass}>{status}</div>
      <div className={styles.details}>
        <div className={styles.itemNameContainer}>
          <h2 className={styles.itemName}>
            {item ? item.itemname : "Unknown Item"}
          </h2>
        </div>
        <p>
          Pickup Location:{" "}
          <span className={styles.locationValue}>
            {pickupLocation || "Unknown Location"}
          </span>
        </p>
        <p>
          Return Location:{" "}
          <span className={styles.locationValue}>
            {returnLocation || "Unknown Location"}
          </span>
        </p>
        <p>
          Request Date Range:{" "}
          <span className={styles.requestDateValue}>
            {new Date(pickupDate).toLocaleDateString()} -{" "}
            {new Date(returnDate).toLocaleDateString()}
          </span>
        </p>
        <div className={styles.buttonContainer}>
          {isIncoming ? (
            status === "accepted" ? (
              status !== "completed" && (
                <Button
                  onClick={handleCompleteRequest}
                  variant="outline"
                  color="blue"
                  size="xs"
                  className={styles.button}
                >
                  Mark as Completed
                </Button>
              )
            ) : (
              status !== "completed" && (
                <>
                  <Button
                    onClick={handleAcceptRequest}
                    variant="outline"
                    color="green"
                    size="xs"
                    className={styles.button}
                  >
                    Accept
                    </Button>
                  <Button
                  onClick={handleDenyRequest}  
                  variant="outline"
                  color="red"
                  size="xs"
                  className={styles.button}
>
                  Deny
                  </Button>
                </>
              )
            )
          ) : (
            <>
              {status !== "completed" && (
                <Button
                  onClick={handleEditRequest}
                  variant="outline"
                  color="blue"
                  size="xs"
                  className={styles.button}
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={handleDeleteRequest}
                variant="outline"
                color="red"
                size="xs"
                className={styles.button}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BRequestCard;
