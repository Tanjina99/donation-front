import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import create from "../../public/create.json";
import { toast } from "sonner";

const CreateDonation = () => {
  const [loading, setLoading] = useState(true);
  const [donationData, setDonationData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    amount: 0,
    category: "",
    donationAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (donationData.amount <= 0) {
      toast.error("Donation amount must be greater than zero.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-donation",
        donationData
      );
      toast.success("You created a new donation successfully!");

      setDonationData({
        title: "",
        description: "",
        thumbnail: "",
        amount: 0,
        category: "",
        donationAmount: 0,
      });
    } catch (err) {
      toast.error("Failed to create donation. Please try again.", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-6">
      <div className="flex max-w-4xl bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="w-1/2 text-center pr-6">
          <h1 className="text-3xl font-bold mb-6 text-gradient whitespace-nowrap">
            Create a New Donation
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-0">
              <label className="label">
                <span className="label-text">Donation Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={donationData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-0">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={donationData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="form-control mb-0">
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                value={donationData.thumbnail}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-0">
              <label className="label">
                <span className="label-text">Donation Amount ($)</span>
              </label>
              <input
                type="number"
                name="amount"
                value={donationData.amount}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                value={donationData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                <option value="Housing">Housing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Environmental">Environmental</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-outline btn-success w-full"
            >
              {loading ? (
                <span className="loading loading-ring loading-md"></span>
              ) : (
                "Create Donation"
              )}
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-6 flex items-center justify-center">
          <Lottie animationData={create} loop={true} className="w-70 h-70" />
        </div>
      </div>
    </div>
  );
};

export default CreateDonation;
