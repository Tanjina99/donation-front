import React from "react";
import Lottie from "lottie-react";
import ideas from "../../../public/ideas.json";

const AdminBoard = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-lg">
          Manage all your data efficiently and intuitively.
        </p>
        <Lottie
          animationData={ideas}
          loop={true}
          className="w-64 h-64 mx-auto"
        />
      </div>
    </div>
  );
};

export default AdminBoard;
