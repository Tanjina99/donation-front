import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayFund = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/fundraiser"
        );
        setFundraisers(response.data.data);
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundraisers();
  }, []);

  const handleEditClick = (fundraiser) => {
    setSelectedFundraiser(fundraiser);
    setModalOpen(true);
  };

  const handleUpdateFundraiser = async () => {
    try {
      setLoading(true);
      const updatedFundraiser = {
        ...selectedFundraiser,
      };

      const response = await axios.put(
        `http://localhost:5000/api/fundraiser/${selectedFundraiser._id}`,
        updatedFundraiser
      );

      setFundraisers((prevFundraisers) =>
        prevFundraisers.map((fundraiser) =>
          fundraiser._id === selectedFundraiser._id
            ? response.data.data
            : fundraiser
        )
      );

      setModalOpen(false);
    } catch (error) {
      console.error("Error updating fundraiser:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFund = async (fundraiserId) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/fundraiser/${fundraiserId}`
      );
      setFundraisers((prevFundraisers) =>
        prevFundraisers.filter((fundraiser) => fundraiser._id !== fundraiserId)
      );
    } catch (error) {
      console.error("Error deleting fundraiser:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        All Fundraisers
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          Loading fundraisers...
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <span className="text-1xl font-semibold text-black">
              Total Fundraisers: {fundraisers.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left text-black text-1xl">Title</th>
                  <th className="text-left text-black text-1xl">Description</th>
                  <th className="text-left text-black text-1xl">Thumbnail</th>
                  <th className="text-left text-black text-1xl">Category</th>
                  <th className="text-left text-black text-1xl">
                    Target Amount
                  </th>
                  <th className="text-left text-black text-1xl">
                    Raised Amount
                  </th>
                  <th className="text-left text-black text-1xl">Days Left</th>
                  <th className="text-left text-black text-1xl">Status</th>
                  <th className="text-left text-black text-1xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fundraisers.map((fundraiser) => (
                  <tr
                    key={fundraiser._id}
                    className="border-b hover:bg-gray-200"
                  >
                    <td className="text-black">{fundraiser.title}</td>
                    <td className="text-black truncate max-w-xs">
                      {fundraiser.description}
                    </td>
                    <td className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={fundraiser.thumbnail}
                          alt={fundraiser.title}
                        />
                      </div>
                    </td>
                    <td className="text-black">{fundraiser.category}</td>
                    <td className="text-black">${fundraiser.targetedAmount}</td>
                    <td className="text-black">${fundraiser.raisedAmount}</td>
                    <td className="text-black">{fundraiser.daysLeft} days</td>
                    <td className="text-black">{fundraiser.status}</td>
                    <td className="flex items-center space-x-2 justify-center mt-1">
                      <button
                        className="btn btn-outline btn-success text-xs px-3 py-1"
                        onClick={() => handleEditClick(fundraiser)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-error text-xs px-1 py-1"
                        onClick={() => handleDeleteFund(fundraiser._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 transform scale-100">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Update Fundraiser
                </h2>
                {/* The rest of your modal content */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline btn-success"
                    onClick={handleUpdateFundraiser}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayFund;
