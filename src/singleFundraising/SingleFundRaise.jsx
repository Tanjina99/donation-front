import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { toast } from "sonner";

const SingleFundraiserPage = () => {
  const { id } = useParams();
  const [fundraiser, setFundraiser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/fundraiser/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFundraiser(data.data);
      })
      .catch((error) => console.error("Error fetching fundraiser:", error));
  }, [id]);

  if (!fundraiser) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const handleClick = () => {
    toast.success("Click below to donate");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Make a Difference Every Dollar Counts!
      </h1>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 space-y-4 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2 flex items-center justify-center p-4">
          <img
            src={fundraiser.thumbnail}
            alt={fundraiser.title}
            className="w-full h-96 object-cover rounded-lg"
            key={fundraiser._id}
          />
        </div>

        <div className="md:w-2/3 p-6 flex flex-col justify-between space-y-4">
          <h1 className="text-2xl font-bold mb-2 text-left text-gray-800">
            {fundraiser.title}
          </h1>
          <p className="text-gray-700">{fundraiser.description}</p>
          <p className="text-gray-700">
            Targeted Amount: ${fundraiser.targetedAmount}
          </p>
          <p className="text-gray-700">
            Raised Amount: ${fundraiser.raisedAmount}
          </p>
          <p className="text-gray-700">
            Days Left:{" "}
            <span className="font-bold text-red-600">
              {fundraiser.daysLeft} days
            </span>
          </p>

          <p className="text-gray-700">Category: {fundraiser.category}</p>
          <p className="text-gray-700">Status: {fundraiser.status}</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              How Funds Will Be Used
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>50% for purchasing educational materials.</li>
              <li>30% for infrastructure development.</li>
              <li>20% for staff and volunteer training.</li>
            </ul>
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <span className="text-lg font-semibold text-green-600 whitespace-nowrap">
              ${fundraiser.targetedAmount - fundraiser.raisedAmount} to go
            </span>

            <div className="flex-grow bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-full rounded-full"
                style={{
                  width: `${
                    (fundraiser.raisedAmount / fundraiser.targetedAmount) * 100
                  }%`,
                }}
              ></div>
            </div>

            <button
              onClick={() => handleClick()}
              className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Donate Now
            </button>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => toast.success("Donated $25. Thank you!")}
              className="bg-gray-300 text-gray-800 px-2 py-0.5 rounded-lg"
            >
              $25
            </button>
            <button
              onClick={() => toast.success("Donated $50, Thank you!")}
              className="bg-gray-300 text-gray-800 px-2 py-0.5 rounded-lg"
            >
              $50
            </button>
            <button
              onClick={() => toast.success("Donated $100, Thank you!")}
              className="bg-gray-300 text-gray-800 px-2 py-0.5 rounded-lg"
            >
              $100
            </button>
            {/* <div className="flex items-center">
              <input
                type="number"
                placeholder="Enter any amount"
                className="border border-gray-300 px-2 py-0.5 rounded-lg"
                min="0"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFundraiserPage;
