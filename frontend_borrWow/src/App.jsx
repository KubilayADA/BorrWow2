import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDash from "./pages/UserDash";
import CreateNewItemPage from "./pages/CreateNewItemPage";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import BRequestsBYUserPage from "./pages/BRequestsBYUserPage";
import FavoritesPage from "./pages/FavoritesPage";
import ErrorPage from "./pages/404ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import SearchResultsPage from "./pages/SearchResultsPage";
import UserBorrWows from "./pages/UserBorrWows";
import EditItemPage from "./pages/EditItemPage";
import BRequestsTOUserPage from "./pages/BRequestsTOUserPage";
import ProfilePage from "./pages/ProfilePage";
import EditBRequestForm from "./components/EditBRequestForm";
import AboutPage from "./pages/AboutPage"; 
import InviteFriends from "./pages/InviteFriends"; 
import ErrorBoundary from "./components/ErrorBoundary";
import RedeemPage from "./pages/RedeemPage"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>

        <ErrorBoundary>
          
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/InviteFriends" element={<InviteFriends />} />
          <Route path="/redeem" element={<RedeemPage />} />
          <Route
            path="/userdash"
            element={
              <PrivateRoute>
                <UserDash />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/newitem"
            element={
              <PrivateRoute>
                <CreateNewItemPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditItemPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/requestedByYOU"
            element={
              <PrivateRoute>
                <BRequestsBYUserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/incomingrequests"
            element={
              <PrivateRoute>
                <BRequestsTOUserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-borrwows"
            element={
              <PrivateRoute>
                <UserBorrWows />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-borrow-request/:id"
            element={
              <PrivateRoute>
                <EditBRequestForm />
              </PrivateRoute>
            }
          />
          <Route path="/items" element={<ItemListPage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/about" element={<AboutPage />} />{" "}
          {/* Add route for About Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      

      </ErrorBoundary>
      
    </>
  );
}


export default App;
