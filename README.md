# BorrWow

Welcome to the BorrWow project! This repository provides a comprehensive overview of the application, including its purpose, technical structure, and recent updates. The current implementation is a revised and improved version of an original group project developed during the Ironhack Berlin Full-Stack Web Development Intensive course, where I collaborated with two teammates.

Due to technical issues and broken functionality in the original version, I decided to rebuild and refactor the project from the ground up, focusing on improved structure, functionality, and maintainability. You can view the initial project and my contributions here: 
https://github.com/KubilayADA/backend_borrWow || https://github.com/KubilayADA/frontend_borrWow

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
  - [User Authentication](#user-authentication)
  - [Item Management](#item-management)
  - [Borrowing Request Management](#borrowing-request-management)
- [Models and Relationships](#models-and-relationships)
  - [User Model](#user-model)
  - [Item Model](#item-model)
  - [BorrowingRequest Model](#borrowingrequest-model)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication-endpoints)
  - [Items](#items)
  - [Borrowing Requests](#borrowing-requests)
  - [Trust Points](#trust-points)
- [Implementation Details](#implementation-details)
  - [Backend (Node.js, Express, MongoDB)](#backend-nodejs-express-mongodb)
  - [Frontend (React, Vite, Mantine)](#frontend-react-vite-mantine)
  - [Authentication](#authentication)
  - [Relationships Handling](#relationships-handling)
  - [Trust Points System](#trust-points-system)
  - [Request Management](#request-management)
- [Links](#links)
- [Trello Board To-Do List](#trello-board-to-do-list)

## Overview
BorrWow is a full-stack web application designed to foster a sharing economy by enabling users to lend and borrow items within their community. The platform promotes trust and collaboration through a built-in Trust Points System.

Currently, trust points are awarded through a referral-based invite system, where users gain points by inviting friends who join the platform. Future development will extend this system to include trust points for successful borrowing transactions, further enhancing user credibility and community engagement.

Users can:
✅ List items they’re willing to lend  
✅ Browse and request items from others  
✅ Earn trust points (currently via referrals, with borrowing rewards coming soon)  
✅ Add items to a favorites list for easy access later

The app includes full user authentication, private routes on the frontend, and protected routes on the backend to ensure a secure and seamless user experience.

## Key Features 

### User Authentication

- **Secure Registration and Login:**  
	Passwords are hashed using bcryptjs.  
	Authentication is implemented using JWT (JSON Web Tokens).
    
- **Token Verification:**  
    Protected routes ensure only authenticated users can access certain features.  
    Token validation is handled via middleware.

### Item Management

- **List Items:**  
    Users can create, edit, favorite, and delete item listings.
- **Browse Items:**  
    Items are categorized and searchable by name, category, and location.
- **Item Details:**  
    Detailed information about each item, including availability and owner details.

### Borrowing Request Management

- **Request to Borrow:**  
  Users can request to borrow available items with specified pickup and return dates.
- **Request History:**  
  Borrowers and lenders can view and manage their borrowing requests.
- **Lender Management:**  
  Lenders can accept or reject borrowing requests.
- **Trust Points:**  
  Both lender and borrower receive trust points upon successful borrowing.

## Models and Relationships

### User Model

- **Fields:** `username`, `email`, `password`, `trustPoints`, `imageUrl`, `referredBy`, `inviteCode`, `timestamps`.
- **Relationships:**  
  **Owner:**  
  A user can own multiple items (referenced in the Item model).

  **Borrower:**  
  A user can have multiple borrowing requests (referenced in the BorrowRequest model).
    
  **Referrals:**  
  A user can refer other users and be referred by another user.

### Item Model

- **Fields:** `itemname`, `description`, `category`, `location`, `owner`, `availability`, `imageUrl`, `timestamps`. 
- **Relationships:**  
  Each item is linked to a user (owner) via the owner field, which references the User model, and an item can have multiple borrowing requests.

### BorrowingRequest Model

- **Fields:** `item`, `borrower`, `owner`, `pickupDate`, `returnDate`, `pickupLocation`, `returnLocation`, `status` (pending, accepted, rejected, completed), etc.
- **Relationships:**  
  **Item:**  
  Each borrowing request is linked to an item via the item field, which references the Item model.
  
  **Borrower:**  
  Each borrowing request is linked to a borrower via the `borrower` field, which references the User model.
  
  **Owner:**  
  Each borrowing request is linked to an owner via the `owner` field, which references the User model.

## API Endpoints

### User Authentication Endpoints

1. **POST /auth/signup**

   **Purpose:**  
   Register a new user.

   **Request Body:**  
   - `username`: The username of the new user.
   - `email`: The email address of the new user.
   - `password`: The password of the new user.
   - `referralCode` (optional): A referral code from another user.

   **Response:**  
   - Success: `{ success: true }`
   - Error: `{ error: "Invalid referral code" }` or validation errors.

   **Relationships:**  
   If a valid referralCode is provided, the referring user (`referredBy`) and referred users (`referredUsers`) are updated in the User model. Trust points are awarded to both the referrer and the new user.

   **Files:**  
   - `auth.routes.js`: Defines the route and logic for user registration.
   - `User.model.js`: Updates the `referredBy` and `referredUsers` fields.

2. **POST /auth/login**

   **Purpose:**  
   Authenticate a user and return a JWT.

   **Request Body:**  
   - `username`: The username of the user.
   - `password`: The password of the user.

   **Response:**  
   - Success: `{ token: <JWT> }`
   - Error: `{ message: "Incorrect password" }` or `{ message: "No user with this username" }`.

   **Files:**  
   - `auth.routes.js`: Defines the route and logic for user login.
   - `auth.middleware.js`: Handles JWT generation and validation.

3. **GET /auth/verify**

   **Purpose:**  
   Verify the validity of a JWT.

   **Response:**  
   - Success: `{ userId: <userId>, message: "Token valid" }`
   - Error: `{ message: "Unauthorized" }`.

   **Files:**  
   - `auth.routes.js`: Defines the route for token verification.
   - `auth.middleware.js`: Validates the JWT.

### Items

1. **GET /items**

   **Purpose:**  
   Retrieve all items.

   **Response:**  
   - Success: An array of items, each populated with the owner's username.

   **Relationships:**  
   Each item is linked to a user (owner) in the Item model.

   **Files:**  
   - `item.routes.js`: Defines the route and logic for fetching all items.
   - `Item.model.js`: Provides the schema for items.

2. **POST /items**

   **Purpose:**  
   Create a new item listing.

   **Request Body:**  
   - `itemname`: The name of the item.
   - `description`: A description of the item.
   - `category`: The category of the item.
   - `location`: The location of the item.
   - `availability`: The availability status of the item.

   **Response:**  
   - Success: The newly created item.

   **Relationships:**  
   The owner field in the Item model is set to the authenticated user.

   **Files:**  
   - `item.routes.js`: Defines the route and logic for creating an item.
   - `Item.model.js`: Provides the schema for items.

3. **GET /items/:id**

   **Purpose:**  
   Retrieve a specific item by its ID.

   **Response:**  
   - Success: The item details, including the owner's username.
   - Error: `{ message: "Item not found" }`.

   **Files:**  
   - `item.routes.js`: Defines the route and logic for fetching an item by ID.

4. **PUT /items/:id**

   **Purpose:**  
   Update an item listing by its ID.

   **Request Body:**  
   Fields to update (e.g., `itemname`, `description`, `availability`).

   **Response:**  
   - Success: The updated item.
   - Error: `{ message: "Item not found" }` or `{ message: "Unauthorized" }`.

   **Files:**  
   - `item.routes.js`: Defines the route and logic for updating an item.

5. **DELETE /items/:id**

   **Purpose:**  
   Delete an item listing by its ID.

   **Response:**  
   - Success: `{ message: "Item successfully deleted" }`.
   - Error: `{ message: "Item not found" }` or `{ message: "Unauthorized" }`.

   **Files:**  
   - `item.routes.js`: Defines the route and logic for deleting an item.

### Borrowing Requests

1. **GET /borrowrequests**

   **Purpose:**  
   Retrieve all borrowing requests for the authenticated user.

   **Response:**  
   - Success: An array of borrowing requests, each populated with the item, borrower, and owner details.

   **Relationships:**  
   Each borrowing request is linked to an item (item) and two users (borrower and owner) in the BorrowRequest model.

   **Files:**  
   - `borrowRequest.routes.js`: Defines the route and logic for fetching borrowing requests.
   - `BorrowRequest.model.js`: Provides the schema for borrowing requests.

2. **POST /borrowrequests**

   **Purpose:**  
   Create a new borrowing request.

   **Request Body:**  
   - `itemId`: The ID of the item to borrow.
   - `pickupDate`: The pickup date for the item.
   - `returnDate`: The return date for the item.
   - `pickupLocation`: The pickup location for the item.
   - `returnLocation`: The return location for the item.

   **Response:**  
   - Success: The newly created borrowing request.
   - Error: `{ error: "Item not found" }` or `{ error: "You cannot borrow your own item" }`.

   **Files:**  
   - `borrowRequest.routes.js`: Defines the route and logic for creating a borrowing request.

3. **GET /borrowrequests/:id**

   **Purpose:**  
   Retrieve a specific borrowing request by its ID.

   **Response:**  
   - Success: The borrowing request details, including the item, borrower, and owner.
   - Error: `{ message: "Borrow request not found" }`.

   **Files:**  
   - `borrowRequest.routes.js`: Defines the route and logic for fetching a borrowing request by ID.

4. **PUT /borrowrequests/:id**

   **Purpose:**  
   Update a borrowing request by its ID.

   **Request Body:**  
   Fields to update (e.g., `pickupDate`, `returnDate`, `status`).

   **Response:**  
   - Success: The updated borrowing request.
   - Error: `{ message: "Borrow request not found" }` or `{ message: "Unauthorized" }`.

   **Files:**  
   - `borrowRequest.routes.js`: Defines the route and logic for updating a borrowing request.

5. **DELETE /borrowrequests/:id**

   **Purpose:**  
   Delete a borrowing request by its ID.

   **Response:**  
   - Success: `{ message: "Borrow request deleted successfully" }`.
   - Error: `{ message: "Borrow request not found" }` or `{ message: "Unauthorized" }`.

   **Files:**  
   - `borrowRequest.routes.js`: Defines the route and logic for deleting a borrowing request.

### Trust Points

1. **POST /redeem**

   **Purpose:**  
   Redeem trust points for rewards.

   **Request Body:**  
   - `temId`: The ID of the reward item to redeem.

   **Response:**  
   - Success: `{ success: true, newBalance: <trustpoints>, redeemedItem: <item> }`.
   - Error: `{ error: "Invalid item" }` or `{ error: "Insufficient trust points" }`.

   **Relationships:**  
   Updates the `trustpoints` and `redeemedItems` fields in the User model.

   **Files:**  
   - `redeem.routes.js`: Defines the route and logic for redeeming trust points.
   - `User.model.js`: Updates the `trustpoints` and `redeemedItems` fields.

## Implementation Details

### Backend (Node.js, Express, MongoDB)

- **Express Server Setup:**
  - Configured an Express server to handle API routes for user authentication, item management, borrowing requests, and trust points redemption.
  - Middleware stack includes `morgan` for logging, `cookie-parser` for parsing cookies, and `cors` for handling cross-origin requests with a dynamic origin allowlist.

- **Database Integration:**
  - **Migrated from a local MongoDB instance to MongoDB Atlas:**  
    To ensure reliable connectivity and scalability in production, I successfully transformed our local database setup into a remote MongoDB Atlas cluster. This migration resolved data-fetching issues and improved overall system performance.
  - Utilized Mongoose for MongoDB schema definitions and database interactions.
  - Established relationships between models (`User`, `Item`, `BorrowRequest`, `Testimonial`) to handle complex data dependencies.

- **Authentication Middleware:**
  - Implemented JWT-based authentication using `jsonwebtoken`.
  - Middleware (`auth.middleware.js`) verifies tokens and attaches user information to the request object for protected routes.

- **Error Handling:**
  - Centralized error handling middleware to manage 404 errors and internal server errors.
  - Logs errors to the console and provides meaningful JSON responses to the client.

- **API Endpoints:**
  - Modularized routes for users, items, borrowing requests, favorites, and trust points redemption.
  - Example routes:
    - `POST /auth/signup`: Handles user registration with optional referral code logic.
    - `GET /api/items/search`: Supports query-based item searches with filters for category and location.
    - `PUT /api/borrowrequests/:id/accept`: Updates the status of a borrowing request to "accepted".

### Frontend (React, Vite, Mantine)

- **React Application Setup:**
  - Built with React and Vite for fast development and optimized builds.
  - State management handled using Context API (`SessionContext`) for authentication and user session tracking.

- **Routing:**
  - Configured `react-router-dom` for client-side routing.
  - Implemented private routes (`PrivateRoute.jsx`) to restrict access to authenticated users.

- **Component Architecture:**
  - Modularized components for reusability and maintainability:
    - `ItemListCard`: Displays item details with favorite functionality.
    - `BRequestCard`: Manages borrowing request actions (accept, reject, complete).
    - `ProfileCard`: Displays user profile information with dynamic data binding.

- **Styling:**
  - Used CSS modules for scoped and maintainable styles.
  - Integrated Mantine UI components for consistent design and responsiveness.

### Authentication

- **Password Security:**
  - Passwords are hashed using `bcryptjs` before being stored in the database.

- **JWT Authentication:**
  - Tokens are issued upon login and verified for protected API routes.
  - Token validation is performed on the frontend during app initialization to maintain user sessions.

- **Referral System:**
  - Users can generate unique invite codes to refer others.
  - Referrals are rewarded with trust points upon successful registration.

### Relationships Handling

- **Model Relationships:**
  - `BorrowRequest` links `Item`, `User` (borrower), and `User` (owner) models.
  - Deletion of an item automatically removes associated borrowing requests using Mongoose middleware.

- **Data Population:**
  - Borrowing requests are populated with item and user details for comprehensive API responses.

### Trust Points System

- **Point Allocation:**
  - Trust points are awarded to both lender and borrower upon successful completion of referring a friend.
  - Points can be redeemed for predefined rewards via the `/api/redeem` endpoint. (In progress)
  
- **User Profile Integration:**
  - Users can view their trust points and redemption history on their profile page.

### Request Management

- **Borrowing Requests:**
  - Borrowers can create requests specifying pickup and return dates, as well as locations.
  - Lenders can accept, reject, or mark requests as completed.

- **Status Updates:**
  - Borrowing requests support multiple statuses (`unseen`, `seen`, `accepted`, `rejected`, `completed`).
  - Status changes trigger updates in the frontend for real-time feedback.

This project demonstrates expertise in building a full-stack application using the MERN stack, with a focus on secure authentication, efficient data relationships, and a seamless user experience.

## Installation

To get the project up and running on your local machine, follow these steps:

 **Clone the Repository**

   First, clone the repository from GitHub and navigate into the project directory:

   ```bash
   git clone https://github.com/KubilayADA/borrWow.git
   cd borrWow
   npm install
   npm run dev
   Open your browser and navigate to http://localhost:3000
   ```
## Recent Updates

- Users can now invite friends to join the platform using their unique invite codes.
- The application has been migrated to MongoDB Atlas, providing a more robust and scalable database solution.
- Improved error handling with centralized middleware.
- Enhanced the frontend with responsive design using Mantine UI.
- Improved the frontend UI with a more user-friendly design.
- Navigation has been improved for a smoother user experience and integration of hamburger menu.
- The application is now fully responsive, ensuring a seamless experience across various devices.
- The backend has been refactored for improved scalability and maintainability.
- The frontend has been refactored for improved performance and maintainability.
- The application has been deployed to Render for easy access and sharing.
- Further development is planned to include borrowing rewards for successful borrowing transactions.
- Smooth scrolling has been implemented for a more user-friendly experience.
- Adjusted method visibility for better control:
"Delete" method now only accessible by request creators.
"Deny" action visible only to item owners.
Improved checks for item existence and null values in item image URLs, with a fallback for alt attributes.
## LINKS
- [Frontend Repository](https://github.com/KubilayADA/BorrWow2/tree/main/frontend_borrWow)
- [Backend Repository](https://github.com/KubilayADA/BorrWow2/tree/main/backend_borrWow)

## TRELLO BOARD TO-DO LIST: 
(https://trello.com/b/MNf4qzx3/borwow-to-do)