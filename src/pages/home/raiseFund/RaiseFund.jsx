import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcDonate } from "react-icons/fc";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const RaiseFund = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fundraiser"
        );
        setCampaigns(response.data.data);
      } catch (error) {
        console.error("Failed to load fundraising campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();

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
          Ongoing Fundraising Campaigns
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div
              key={campaign._id}
              className="card bg-white shadow-xl border-0 rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <img
                src={campaign.thumbnail}
                alt={campaign.title}
                className="rounded-t-lg w-full h-40 object-cover mb-4"
              />

              <h3 className="text-xl font-semibold text-black mb-2">
                {campaign.title}
              </h3>
              <p className="text-sm text-black mb-4">{campaign.description}</p>

              <div className="mb-4">
                <div className="text-sm text-black">
                  <span className="font-semibold">Targeted Amount:</span> ${" "}
                  {campaign.targetedAmount}
                </div>
              </div>

              <div className="card-actions flex justify-center">
                <Link to={`/single-fundraise/${campaign._id}`}>
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
          <Link to="/fundraising">
            <button className="btn btn-success bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3">
              View All Campaigns
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RaiseFund;
