import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import axios from "axios";
import AuthProvider from "../utils/authProvider/AuthProvider";

const SingleDonationPage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [donationId, setDonationId] = useState("");
  const [bio, setBio] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = AuthProvider();

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/donations/${id}`
        );
        setDonation(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation:", error);
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, refreshKey]);

  const handleDonateClick = (amount) => {
    setShowModal(true);
    setAmount(amount);
    setDonationId(donation._id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const transactionData = {
      donorId: user.id,
      donationId,
      amount,
      message: bio,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/donation-transaction",
        transactionData
      );
      if (response.data.status === "success") {
        toast.success("You donated successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-white min-h-screen flex flex-col justify-center items-center">
        {loading ? (
          <p>Loading...</p>
        ) : donation ? (
          <>
            <h1 className="text-2xl sm:text-lg md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Help Us Reach Our Goal
            </h1>

            <div className="flex flex-col items-center sm:flex-col md:flex-row md:space-x-4 w-full">
              {donation.thumbnail ? (
                <img
                  src={donation.thumbnail}
                  alt={donation.title}
                  className="w-full sm:w-full md:w-1/2 rounded-lg mb-4 md:mb-0"
                />
              ) : (
                <div className="w-full sm:w-full md:w-1/2 rounded-lg bg-gray-200 h-45"></div>
              )}
              <div className="w-full sm:w-full md:w-1/2 mt-4 md:mt-0">
                <h1 className="text-2xl font-bold mb-2 text-center md:text-left text-black">
                  {donation.title}
                </h1>

                <div className="justify-star sm:justify-center md:justify-center">
                  <span className="text-black font-bold">
                    Category: {donation.category}
                  </span>
                </div>
                <p className="text-gray-700 mt-2 mb-4 text-center md:text-left">
                  {donation.description}
                </p>

                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-black">
                    About this Cause
                  </h2>
                  <p className="text-gray-700 mb-2">
                    This cause aims to address critical challenges in our
                    community, such as access to clean water, education for
                    underserved children, and support for disaster relief
                    efforts.
                  </p>
                  <p className="text-gray-700 mb-2">
                    It specifically focuses on providing essential resources to
                    those who need it most, tackling issues like food insecurity
                    and homelessness.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Your generous donations will enable us to create sustainable
                    solutions that empower individuals and communities to
                    thrive.
                  </p>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-black">
                      Success Stories
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Thanks to your support, we’ve been able to provide over
                      500 families with emergency food supplies after a natural
                      disaster. One family’s story of recovery showcases the
                      impact of your generosity.
                    </p>
                    <p className="text-gray-700 mb-2">
                      Another success story highlights how our educational
                      scholarships have helped more than 200 children access
                      quality education, breaking the cycle of poverty.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 justify-center md:justify-start mt-4">
                  <span className="text-xl font-semibold text-green-600">
                    ${donation.amount}
                  </span>
                </div>

                <button
                  onClick={() => handleDonateClick(donation.donationAmount)}
                  className="bg-green-500 text-white px-4 py-1 pt-2 pb-2 mb-4 rounded-lg hover:bg-green-600 focus:outline-none mt-2 sm:mt-0 sm:py-2 sm:px-6 flex justify-center"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-700 text-center">
            Donation data not available.
          </p>
        )}
      </div>

      {showModal && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle md:modal-middle flex justify-center items-center"
          open
        >
          <div className="modal-box p-4 sm:p-6 md:p-8">
            <h3 className="font-bold text-lg">Please Donate!</h3>
            <p>Donation Amount: ${amount}</p>
            <form onSubmit={handleFormSubmit}>
              <textarea
                className="textarea w-full p-2 sm:p-3 md:p-4"
                rows={1}
                placeholder="Write something about your donation..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <div className="modal-action mt-4">
                <button
                  type="submit"
                  className="btn bg-green-500 text-white hover:bg-green-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn bg-gray-500 text-white hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SingleDonationPage;
