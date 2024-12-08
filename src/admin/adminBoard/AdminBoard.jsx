import React from "react";
import { NavLink } from "react-router";

const AdminBoard = () => {
  return (
    <div className="text-center bg-white p-8 border rounded-lg shadow-lg">
      <h1 className="text-4xl mb-6 text-black font-bold">Admin Dashboard</h1>
      <ul className="space-y-6">
        <li>
          <NavLink
            to="/admin/display-donation"
            className="inline-block text-lg text-black font-bold py-2 px-4 rounded hover:bg-green-300"
          >
            Display Donation
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/display-fund"
            className="inline-block  text-lg text-black font-bold py-2 px-4 rounded hover:bg-green-300"
          >
            Display Fund
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/amount-collected"
            className="inline-block  text-lg text-black font-bold py-2 px-4 rounded hover:bg-green-300"
          >
            Amount Collected
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/number-of-donors"
            className="inline-block  text-lg text-black font-bold py-2 px-4 rounded hover:bg-green-300"
          >
            Number Of Donors
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminBoard;
