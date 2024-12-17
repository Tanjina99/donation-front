import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/mainLayout/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Donation from "./pages/donation/Donation.jsx";
import FundRaising from "./pages/fundRaising/FundRaising.jsx";
import AboutUs from "./pages/aboutUs/AboutUs.jsx";
import ContactUs from "./pages/contactUs/ContactUs.jsx";
import Login from "./pages/login/Login.jsx";
import { Toaster } from "sonner";
import Register from "./pages/register/Register.jsx";
import SingleDonationPage from "./singlePageDonation/SingleDonationPage.jsx";
import SingleFundRaise from "./singleFundraising/SingleFundRaise.jsx";
import AdminBoard from "./admin/adminBoard/AdminBoard.jsx";
import DisplayDonation from "./admin/DisplayDonation.jsx";
import DisplayFund from "./admin/DisplayFund.jsx";
import AdminLayout from "./layout/adminLayout/AdminLayout.jsx";
import CreateDonation from "./admin/CreateDonation.jsx";
import CreateFundraising from "./admin/CreateFundraising.jsx";
import AllUsers from "./admin/AllUsers.jsx";
import AllTransactions from "./admin/AllTransactions.jsx";
import UserTransaction from "./userTransaction/UserTransaction.jsx";
import ErrorPage from "./errorPage/ErrorPage.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="donation" element={<Donation />} />
          <Route path="fundraising" element={<FundRaising />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route
            path="single-donation/:id"
            element={
              <PrivateRoute
                element={<SingleDonationPage />}
                requiredRole={["user", "admin"]}
              />
            }
          />
          <Route path="single-fundraise/:id" element={<SingleFundRaise />} />
          <Route path="user-transactions/:id" element={<UserTransaction />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminBoard />} />
          <Route path="display-donation" element={<DisplayDonation />} />
          <Route
            path="create-donation"
            element={
              <PrivateRoute
                element={<CreateDonation />}
                requiredRole={["admin"]}
              />
            }
          />
          <Route path="display-fundraising" element={<DisplayFund />} />
          <Route path="create-fundraising" element={<CreateFundraising />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-transactions" element={<AllTransactions />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

    <Toaster />
  </StrictMode>
);
