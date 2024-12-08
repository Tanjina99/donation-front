import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const SingleDonationPage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [showmodal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/donations/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDonation(data.data);
        console.log("Fetched donation data:", data);
      })
      .catch((error) => console.error("Error fetching donation:", error));
  }, [id]); // Dependency array to update the effect when `id` changes

  if (!donation) {
    return <div>Loading...</div>;
  }

  const handleDonateClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-20 text-center md:text-left text-black">
          Help Us Reach Our Goal
        </h1>

        <div className="flex flex-col items-center md:flex-row md:space-x-4 w-full">
          {donation.thumbnail ? (
            <img
              src={donation.thumbnail}
              alt={donation.title}
              className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0"
              key={donation._id}
            />
          ) : (
            <div className="w-full md:w-1/2 rounded-lg bg-gray-200 h-45"></div>
          )}
          <div className="md:w-1/2 mt-4 md:mt-0">
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

            {/* added from front end */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-black">
                About this Cause
              </h2>
              <p className="text-gray-700 mb-2">
                This cause aims to address critical challenges in our community,
                such as access to clean water, education for underserved
                children, and support for disaster relief efforts.
              </p>
              <p className="text-gray-700 mb-2">
                It specifically focuses on providing essential resources to
                those who need it most, tackling issues like food insecurity and
                homelessness.
              </p>
              <p className="text-gray-700 mb-2">
                Your generous donations will enable us to create sustainable
                solutions that empower individuals and communities to thrive.
              </p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-black">
                  Success Stories
                </h3>
                <p className="text-gray-700 mb-2">
                  Thanks to your support, we’ve been able to provide over 500
                  families with emergency food supplies after a natural
                  disaster. One family’s story of recovery showcases the impact
                  of your generosity.
                </p>
                <p className="text-gray-700 mb-2">
                  Another success story highlights how our educational
                  scholarships have helped more than 200 children access quality
                  education, breaking the cycle of poverty.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4 justify-center md:justify-start mt-4">
              <span className="text-xl font-semibold text-green-600">
                ${donation.amount}
              </span>
            </div>

            <button
              onClick={() => handleDonateClick()}
              className="bg-green-500 text-white px-4 py-1 pt-2 pb-2 mb-4 rounded-lg hover:bg-green-600 focus:outline-none -mt-2"
            >
              Donate Now
            </button>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDonateClick(25)}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
              >
                $25
              </button>
              <button
                onClick={() => handleDonateClick(25)}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
              >
                $50
              </button>
              <button
                onClick={() => handleDonateClick(50)}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
              >
                $100
              </button>
            </div>
          </div>
        </div>
      </div>
      {showmodal && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <textarea
              className="textarea"
              cols={65}
              placeholder="Bio"
            ></textarea>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="btn"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SingleDonationPage;
