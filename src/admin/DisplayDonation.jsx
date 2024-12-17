import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/donations");
        setDonations(response.data.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
        toast.error("Failed to load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Handle update
  const handleUpdateClick = (donation) => {
    setCurrentDonation(donation);
    setModalOpen(true);
  };

  const submitUpdate = async () => {
    try {
      setLoading(true);
      const updatedDonation = {
        ...currentDonation,
      };

      const response = await axios.put(
        `http://localhost:5000/api/donations/${currentDonation._id}`,
        updatedDonation
      );

      if (response.status === 200) {
        setDonations((prevDonations) =>
          prevDonations.map((donation) =>
            donation._id === currentDonation._id ? response.data.data : donation
          )
        );

        toast.success("Donation updated successfully.");
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update donation.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (donationId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/donations/${donationId}`
      );

      if (response.status === 200) {
        toast.success("Donation deleted successfully.");
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
      }
    } catch (error) {
      toast.error("Failed to delete donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        All Donations
      </h1>

      {loading ? (
        <div className="text-center p-6">
          Loading donations...
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <span className="text-1xl font-semibold text-black">
              Total Donations: {donations.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left text-black text-1xl">Title</th>
                  <th className="text-left text-black text-1xl">Description</th>
                  <th className="text-left text-black text-1xl">
                    Thumbnail URL
                  </th>
                  <th className="text-left text-black text-1xl">Category</th>
                  <th className="text-left text-black text-1xl">Amount</th>
                  <th className="text-center text-black text-1xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id} className="border-b hover:bg-gray-200">
                    <td className="text-black">{donation.title}</td>
                    <td className="text-black truncate max-w-xs">
                      {donation.description}
                    </td>
                    <td className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={donation.thumbnail} alt={donation.title} />
                      </div>
                    </td>
                    <td className="text-black">{donation.category}</td>
                    <td className="text-black">${donation.amount}</td>
                    <td className="flex items-center space-x-2 justify-center mt-1">
                      <button
                        className="btn btn-outline btn-success text-xs px-3 py-1"
                        onClick={() => handleUpdateClick(donation)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-error text-xs px-1 py-1"
                        onClick={() => handleDelete(donation._id)}
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
                  Update Donation
                </h2>
                {/* Form elements for updating a donation */}
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentDonation.title}
                    onChange={(e) =>
                      setCurrentDonation({
                        ...currentDonation,
                        title: e.target.value,
                      })
                    }
                    className="input input-bordered w-full h-9 text-sm"
                  />
                </div>
                {/* More form fields */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline btn-success"
                    onClick={submitUpdate}
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

export default DonationsPage;
