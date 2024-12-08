import React from "react";
import { FaShieldAlt, FaClock, FaSearchDollar } from "react-icons/fa";

const Advertise = () => {
  return (
    <div className="advertise-section bg-gray-100 py-16 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl font-bold text-green-600 mb-6">
          Revolutionizing Donations with Innovation
        </h2>
        <p className="text-gray-700 text-lg mb-10">
          Experience the future of giving with our platform, where secure
          transactions, real-time updates, and unparalleled transparency
          redefine how you connect with causes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {" "}
          <div className="feature flex flex-col items-center">
            <FaShieldAlt className="text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Secure Transactions
            </h3>
            <p className="text-gray-600 text-center">
              Your donations are safe with advanced encryption ensuring privacy
              and reliability.
            </p>
          </div>
          <div className="feature flex flex-col items-center">
            <FaClock className="text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Real-Time Updates
            </h3>
            <p className="text-gray-600 text-center">
              Stay informed with real-time updates on your contributions and
              their impact.
            </p>
          </div>
          <div className="feature flex flex-col items-center">
            <FaSearchDollar className="text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 whitespace-nowrap">
              Unmatched Transparency
            </h3>
            <p className="text-gray-600 text-center">
              Every penny is accounted for, fostering trust and confidence in
              your donations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
