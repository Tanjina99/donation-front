import React from "react";
import { Link, NavLink, Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="space-y-6 bg-green-300 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/" className="btn btn-ghost text-xl">
              HeartfulHands
            </Link>
          </li>
          <li>
            <NavLink
              to="/admin/display-donation"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black pl-4"
              }
            >
              All Donation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/create-donation"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black p-4"
              }
            >
              Create Donation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/display-fundraising"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black pl-4"
              }
            >
              All Fundraising
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/create-fundraising"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black pl-4"
              }
            >
              Create Fundraising
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/all-users"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black pl-4"
              }
            >
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/all-transactions"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black pl-4"
              }
            >
              All Transactions
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
