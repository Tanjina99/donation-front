import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcDonate } from "react-icons/fc";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const DonationCard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/donations");
        const data = response.data;
        if (data && data.data && Array.isArray(data.data)) {
          setDonations(data.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    // Initialize and refresh AOS
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }

  return (
    <div className="py-16 bg-green-300">
      <div className="max-w-screen-xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-black mb-8" data-aos="fade-up">
          Support a Cause Today
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation, index) => (
            <div
              key={donation._id}
              className="card bg-white shadow-xl border-0 rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <img
                src={donation.thumbnail}
                alt={donation.title}
                className="rounded-t-lg w-full h-40 object-cover mb-4"
              />

              <h3 className="text-xl font-semibold text-black mb-2">
                {donation.title}
              </h3>
              <p className="text-sm text-black mb-4">{donation.description}</p>

              <div className="card-actions flex justify-center">
                <Link to={`/single-donation/${donation._id}`}>
                  <button
                    className="btn btn-outline btn-success flex items-center space-x-1 py-1 px-3"
                    data-aos="fade-up"
                  >
                    <span>Donate Now</span>
                    <FcDonate className="text-2xl ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8" data-aos="fade-up">
          <Link to="/donation">
            <button className="btn btn-success bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3">
              Show All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
