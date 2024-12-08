import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcDonate } from "react-icons/fc";
// import AuthProvider from "../../utils/authProvider/AuthProvider";
import { Link } from "react-router";

const Donation = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  // const { user } = AuthProvider();
  // console.log("User from donation", user);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donations");
        console.log(response.data);

        const donationsData = response.data.data;

        setDonations(donationsData);
        setFilteredDonations(donationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // console.log(donations)

  useEffect(() => {
    let result = donations.filter(
      (donation) =>
        donation.title.toLowerCase().includes(searchTerm.toLowerCase()) // add tolowercase for case sensitiveness
    );

    if (sortOrder === "asc") {
      result = result.sort((a, b) => a.amount - b.amount); // Ascending order (lowest to highest)
    } else {
      result = result.sort((a, b) => b.amount - a.amount); // Descending order (highest to lowest)
    }

    setFilteredDonations(result);
  }, [searchTerm, sortOrder, donations]);

  if (loading) {
    return <div className="text-center p-6">Loading donations...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {" "}
      <div className="max-w-screen-xl mx-auto text-center px-4">
        {" "}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Explore Our All Donations
          </h1>
        </div>
        <div className="flex justify-center mb-6 text-black">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-semibold text-black">
              Sort by Price:
            </label>
            <select
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(filteredDonations) && filteredDonations.length > 0 ? (
            filteredDonations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={donation.thumbnail}
                  alt={donation.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 flex-1">
                  {" "}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {donation.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {donation.description}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    <strong>Category:</strong> {donation.category}
                  </p>
                  <div className="mt-4">
                    <span className="font-bold text-gray-800">
                      ${donation.amount}
                    </span>
                  </div>
                </div>
                <div className="card-actions flex justify-center mb-4">
                  <Link to="/donation">
                    <button className="btn btn-outline btn-success flex items-center space-x-0">
                      <span>Donate Now ${donation.donationAmount}</span>
                      <FcDonate className="text-2xl" />
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              No donations available
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-8 bg-white">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mb-4">
            Previous
          </button>
          <span className="text-gray-700">Page 1 of 10</span>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mb-4">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;
