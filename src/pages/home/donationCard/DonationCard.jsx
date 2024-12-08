import axios from "axios";
import React, { useState, useEffect } from "react";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { Link } from "react-router";
import { FcDonate } from "react-icons/fc";

const DonationCard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donations");
        const data = response.data;
        console.log(data);
        if (data && data.data && Array.isArray(data.data)) {
          setDonations(data.data.slice(0, 6));
        } else {
          console.error("Expected data to be an array, but got:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDonations();
  }, []);

  if (!donations) {
    return <p>Loading...</p>;
  }
  console.log(donations);

  return (
    <div className="mt-0 bg-green-300 p-10">
      <div className="flex items-center justify-center mb-6 text-center sm:text-left md:text-center">
        <h1 className="text-3xl font-bold text-black mr-2">
          Support a Cause Today
        </h1>
        <span>
          <LiaHandsHelpingSolid className="text-4xl text-green-800" />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="donation-card bg-white shadow-3xl rounded-lg overflow-hidden max-w-sm mx-auto p-6 transition-transform transform hover:scale-105"
          >
            <img
              src={donation.thumbnail}
              alt={donation.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="card-content p-4">
              <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                {donation.title}
              </h3>
              {/* <p className="text-sm text-gray-500">{donation.category}</p> */}
              <p className="text-md my-2 text-gray-700">
                {donation.description}
              </p>
            </div>
            <div className="card-actions flex justify-center">
              <Link to={`/single-donation/${donation._id}`}>
                <button className="btn btn-outline btn-success flex items-center space-x-0 py-2 px-4">
                  <span>Donate Now</span>

                  <FcDonate className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/donation">
          <button className="btn btn-success bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3">
            Show All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;
