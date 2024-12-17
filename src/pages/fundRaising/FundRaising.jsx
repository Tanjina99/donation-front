import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcDonate } from "react-icons/fc";
import { Link } from "react-router";

const Fundraising = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const campaignsPerPage = 6;

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fundraiser"
        );
        const campaignData = response.data.data;
        if (Array.isArray(campaignData)) {
          setCampaigns(campaignData);
          setFilteredCampaigns(campaignData);
        } else {
          console.error("Invalid CampaignData", campaignData);
          setCampaigns([]);
          setFilteredCampaigns([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCampaigns([]);
        setFilteredCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchResults = campaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCampaigns(searchResults);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
      if (order === "asc") return a.targetedAmount - b.targetedAmount; // Ascending order from lowest to highest
      if (order === "desc") return b.targetedAmount - a.targetedAmount; // Descending order from highest to lowest
      return 0;
    });
    setFilteredCampaigns(sortedCampaigns);
  };

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Explore Fundraising Campaigns
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by campaign title..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-4/5 md:w-1/3 p-3 border border-gray-300 rounded-md bg-white"
        />
      </div>

      <div className="flex justify-center sm:justify-center md:justify-start mb-6 sm:ml-0 md:ml-12 lg:ml-20">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-semibold text-black">
            Sort Campaigns by:
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md bg-white text-sm text-black"
            onChange={(e) => handleSort(e.target.value)}
            value={sortOrder}
          >
            <option value="asc" className="text-sm">
              Lowest to Highest
            </option>
            <option value="desc" className="text-sm">
              Highest to Lowest
            </option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-80 h-85"
            >
              <img
                src={campaign.thumbnail}
                alt={campaign.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-bold mb-2 text-black">
                  {campaign.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {campaign.description}
                </p>

                <div className="mb-4">
                  <div className="text-gray-700">
                    <span className="font-bold">Goal:</span> $
                    {campaign.targetedAmount}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-bold">Raised:</span> $
                    {campaign.raisedAmount}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{
                        width: `${
                          (campaign.raisedAmount / campaign.targetedAmount) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {campaign.daysLeft} days left
                </p>
                <div className="card-actions flex justify-center mb-2 mt-2">
                  <Link to={`/single-fundraise/${campaign._id}`}>
                    <button className="btn btn-outline btn-success flex items-center space-x-0">
                      <span>Donate Now</span>
                      <FcDonate className="text-2xl" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fundraising;
