import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import create from "../../public/create.json";
import { toast } from "sonner";

const CreateFundraising = () => {
  const [loading, setLoading] = useState(true);
  const [fundraisingData, setFundraisingData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    targetedAmount: "",
    startDate: "", // Optional
    endDate: "", // Optional
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFundraisingData({ ...fundraisingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (fundraisingData.targetedAmount <= 0) {
      toast.error("Targeted amount must be greater than zero.");
      return;
    }

    try {
      // Calculate days left if startDate and endDate are provided
      const startDate = new Date(fundraisingData.startDate);
      const endDate = new Date(fundraisingData.endDate);
      const daysLeft = (endDate - startDate) / (1000 * 60 * 60 * 24);

      // Construct data to send
      const dataToSend = {
        title: fundraisingData.title,
        description: fundraisingData.description,
        thumbnail: fundraisingData.thumbnail,
        targetedAmount: fundraisingData.targetedAmount,
        category: fundraisingData.category,
        startDate: fundraisingData.startDate || null,
        endDate: fundraisingData.endDate || null,
        daysLeft: daysLeft || null, // Calculate days left
        raisedAmount: 0, // Initialize raisedAmount to zero if not provided
      };

      const response = await axios.post(
        "http://localhost:5000/api/create-fund",
        dataToSend
      );

      // Reset form
      setFundraisingData({
        title: "",
        description: "",
        thumbnail: "",
        targetedAmount: "",
        startDate: "",
        endDate: "",
        category: "",
      });

      toast.success("You created a new fundraising successfully!");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-6">
      <div className="flex max-w-4xl bg-white p-8 rounded-lg shadow-lg w-full flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-center md:pr-6">
          <h1 className="text-3xl font-bold mb-6 text-gradient">
            Create a New Fundraising
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Fundraising Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={fundraisingData.title}
                onChange={handleChange}
                className="input input-bordered w-full h-10"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={fundraisingData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-10"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                value={fundraisingData.thumbnail}
                onChange={handleChange}
                className="input input-bordered w-full h-10"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Targeted Amount ($)</span>
              </label>
              <input
                type="number"
                name="targetedAmount"
                value={fundraisingData.targetedAmount}
                onChange={handleChange}
                className="input input-bordered w-full h-10"
                min="1"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Start Date</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={fundraisingData.startDate}
                onChange={handleChange}
                className="input input-bordered w-full h-10"
              />
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={fundraisingData.endDate}
                onChange={handleChange}
                className="input input-bordered w-full h-10"
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                value={fundraisingData.category}
                onChange={handleChange}
                className="select select-bordered w-full h-10"
                required
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
                "Create Fundraising"
              )}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6 flex items-center justify-center">
          <Lottie animationData={create} loop={true} className="w-70 h-70" />
        </div>
      </div>
    </div>
  );
};

export default CreateFundraising;
