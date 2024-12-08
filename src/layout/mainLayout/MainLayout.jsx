import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../sharedComponents/Navbar/Navbar";
import Footer from "../../sharedComponents/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
