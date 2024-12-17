import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import AuthProvider from "../utils/authProvider/AuthProvider";

const SingleFundraiserPage = () => {
  const { id } = useParams();
  const [fundraiser, setFundraiser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [fundRaisingId, setFundRaisingId] = useState("");
  const [bio, setBio] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = AuthProvider();

  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/fundraiser/${id}`
        );
        setFundraiser(response.data.data);
      } catch (error) {
        console.error("Error fetching fundraiser:", error);
        setLoading(false);
      }
    };

    fetchFundraiser();
  }, [id, refreshKey]);

  if (!fundraiser) {
    return <span className="loading loading-ring loading-md"></span>;
  }

  // Calculate remaining days
  const calculateRemainingDays = () => {
    const today = new Date();
    const endDate = new Date(fundraiser.endDate);
    const remainingTime = endDate - today;
    return Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
  };

  const remainingDays = fundraiser ? calculateRemainingDays() : null;

  const handleClick = () => {
    setShowModal(true);
    setFundRaisingId(fundraiser._id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const transactionData = {
      donorId: user.id,
      fundRaisingId,
      amount: donationAmount * 1,
      message: bio,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-transaction",
        transactionData
      );

      if (response.data.status === "Success") {
        toast.success("You donated successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
        setShowModal(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl sm:text-1xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
        Make a Difference Every Dollar Counts!
      </h1>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2 flex items-center justify-center p-4">
          <img
            src={fundraiser.thumbnail}
            alt={fundraiser.title}
            className="w-full h-60 md:h-96 object-cover rounded-lg"
            key={fundraiser._id}
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-between space-y-4">
          <h1 className="text-lg md:text-2xl font-bold mb-2 text-left text-gray-800">
            {fundraiser.title}
          </h1>
          <p className="text-gray-700 text-sm md:text-base">
            {fundraiser.description}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Targeted Amount: ${fundraiser.targetedAmount}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Raised Amount: ${fundraiser.raisedAmount}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Days Left:{" "}
            <span className="font-bold text-red-600">
              {fundraiser.daysLeft} days
            </span>
          </p>

          <p className="text-gray-700 text-sm md:text-base">
            Category: {fundraiser.category}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Status: {fundraiser.status}
          </p>

          <div className="mt-4">
            <h2 className="text-md md:text-lg font-semibold text-gray-800">
              How Funds Will Be Used
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-sm md:text-base">
              <li>50% for purchasing educational materials.</li>
              <li>30% for infrastructure development.</li>
              <li>20% for staff and volunteer training.</li>
            </ul>
          </div>

          {fundraiser.status === "completed" ? (
            <p className="text-red-600 text-sm md:text-base">
              This fundraising is already completed. Please check our other
              fundraising campaigns.
            </p>
          ) : (
            <div className="flex items-center mb-4 space-x-4">
              <span className="text-sm md:text-lg font-semibold text-green-600 whitespace-nowrap">
                ${fundraiser.targetedAmount - fundraiser.raisedAmount} to go
              </span>

              <div className="flex-grow bg-gray-200 rounded-full h-2 md:h-3">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{
                    width: `${
                      (fundraiser.raisedAmount / fundraiser.targetedAmount) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              <button
                onClick={() => handleClick()}
                className="bg-green-500 text-white px-3 py-1 text-sm md:px-4 md:py-2 rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Donate Now
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle md:modal-middle flex justify-center items-center"
          open
        >
          <div className="modal-box w-11/12 max-w-sm p-4 sm:p-5 md:p-6">
            <h3 className="font-bold text-lg text-center">
              Please Donate any amount!
            </h3>
            <form onSubmit={handleFormSubmit} className="mt-4">
              <input
                type="number"
                className="input input-bordered w-full mb-4"
                placeholder="Enter donation amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                min="1"
              />
              <textarea
                className="textarea textarea-bordered w-full mb-4 p-2 sm:p-3"
                rows={2}
                placeholder="Write something about your donation..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <div className="modal-action flex justify-between">
                <button
                  type="submit"
                  className={`btn bg-green-500 text-white hover:bg-green-600 ${
                    loading ? "loading" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SingleFundraiserPage;
