import { useEffect, useState, useContext } from "react";
import BRequestCard from "../components/BRequestCard";
import styles from "../styles/ItemListPage.module.css";
import { SessionContext } from "../contexts/SessionContext";
import EditBRequestForm from "../components/EditBRequestForm";
import { Modal } from "@mantine/core"; 

const BRequestsBYUserPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { token } = useContext(SessionContext);

  useEffect(() => {
    const fetchBYRequests = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/borrowrequests/requested`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrow requests");
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBYRequests();
  }, [token]);

  const handleDelete = (id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/borrowrequests/requested`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch borrow requests");
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Outgoing Requests</h1>
      <div className={styles.container}>
        {requests.map((request) => (
          <BRequestCard
            key={request._id}
            request={request}
            onDelete={handleDelete}
            onEdit={handleEditRequest}
            onUpdate={handleUpdate} // Pass the handleUpdate function
            token={token}
          />
        ))}
      </div>

      {selectedRequest && (
        <Modal
          opened={isModalOpen}
          onClose={handleModalClose}
          title="Edit Borrow Request"
        >
          <EditBRequestForm
            request={selectedRequest}
            onClose={handleModalClose}
            onSave={() => {
              handleModalClose();
              handleUpdate(); // Refresh requests list after saving changes
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default BRequestsBYUserPage;
