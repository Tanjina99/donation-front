import { Link, NavLink, useNavigate } from "react-router";
import AuthProvider from "../../utils/authProvider/AuthProvider";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, setUser } = AuthProvider();
  const navigate = useNavigate();
  // console.log("user", user);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar bg-green-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          HeartfulHands
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="px-1 flex justify-center items-center space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              Donation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fundraising"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              FundRaising
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              AboutUs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              ContactUs
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box z-[2] w-40 p-1 shadow-sm"
            >
              <li>
                <a className="hover:text-green-500">{user.fullName}</a>
              </li>
              <li>
                <Link
                  to={`/user-transactions/${user?.id}`}
                  className="hover:text-green-500"
                >
                  My Transactions
                </Link>
              </li>

              <li>
                <a href="/profile" className="hover:text-green-500">
                  My Profile
                </a>
              </li>
              {user && user.role === "admin" && (
                <li>
                  <Link to="/admin">Admin DashBoard</Link>
                </li>
              )}
              <li>
                <button
                  className="btn btn-error btn-sm text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline btn-success">Donate</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
