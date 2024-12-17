import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router";

const AllUsers = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/all-users");
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:5000/api/all-users/${userId}`,
        { role: newRole }
      );

      if (response.status === 200) {
        toast.success(`User role updated to ${newRole}`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update user role.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:5000/api/all-users/status/${userId}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        toast.success(`User status updated to ${newStatus}`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update user status.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 py-6 text-center">
        All Users
      </h1>
      <div className="flex-grow">
        <div className="w-full overflow-auto">
          <table className="table-auto w-full border-collapse text-center bg-white shadow-lg">
            <thead className="bg-white text-black text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-3 text-center">
                    <span className="loading loading-ring loading-md"></span>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <img
                        src={user.imageUrl}
                        alt={user.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-3">{user.fullName}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.role === "admin"
                            ? "bg-green-200 text-green-700"
                            : "bg-blue-200 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.status === "active"
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {loading ? (
                        <span className="loading loading-ring loading-md"></span>
                      ) : (
                        <>
                          {user.role === "admin" ? (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              onClick={() => handleRoleUpdate(user._id, "user")}
                            >
                              Demote to User
                            </button>
                          ) : (
                            <button
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                              onClick={() =>
                                handleRoleUpdate(user._id, "admin")
                              }
                            >
                              Promote to Admin
                            </button>
                          )}
                          <button
                            className={`ml-2 px-4 py-2 rounded ${
                              user.status === "active"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                            onClick={() =>
                              handleStatusUpdate(
                                user._id,
                                user.status === "active" ? "blocked" : "active"
                              )
                            }
                          >
                            {user.status === "active"
                              ? "Block User"
                              : "Activate User"}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
