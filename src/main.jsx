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
import AuthProvider from "./utils/authProvider/AuthProvider.jsx";
import SingleFundRaise from "./singleFundraising/SingleFundRaise.jsx";
import AdminBoard from "./admin/adminBoard/AdminBoard.jsx";
import DisplayDonation from "./admin/DisplayDonation.jsx";
import DisplayFund from "./admin/DisplayFund.jsx";
import NumberOfDonors from "./admin/NumberOfDonors.jsx";
import AmountCollected from "./admin/AmountCollected.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="donation" element={<Donation />} />
            <Route path="fundraising" element={<FundRaising />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="single-donation/:id"
              element={<SingleDonationPage />}
            />
            <Route path="single-fundraise/:id" element={<SingleFundRaise />} />

            <Route path="admin" element={<AdminBoard />}>
              <Route index element={<AdminBoard />} />
              <Route path="display-donation" element={<DisplayDonation />} />
              <Route path="display-fund" element={<DisplayFund />} />
              <Route path="amount-collected" element={<AmountCollected />} />
              <Route path="number-of-donors" element={<NumberOfDonors />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    <Toaster />
  </StrictMode>
);
