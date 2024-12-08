import React, { useState } from "react";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { SiSpacex } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import Lottie from "lottie-react";
import contactus from "../../../public/contactus.json";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
    //clears the form after sending message.
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="hero min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="card bg-white shadow-2xl p-4 w-full max-w-4xl flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <Lottie
            animationData={contactus}
            loop={true}
            className="w-full h-auto lg:w-[400px] lg:h-[400px]"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="text-center text-sm text-gray-500 my-4">
            Have questions? Reach out to us!
          </p>

          <form onSubmit={handleSubmit} className="card-body p-4">
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-gray-700">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered input-md bg-white"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-gray-700">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered input-md bg-white"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-gray-700">Your Message</span>
              </label>
              <textarea
                name="message"
                placeholder="Write your message"
                className="textarea textarea-bordered bg-white"
                value={formData.message}
                onChange={handleInputChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-success w-full text-white"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <div className="flex justify-center space-x-4 mb-4">
              <a
                href="https://www.facebook.com"
                className="text-2xl hover:text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiFacebook />
              </a>
              <a
                href="https://x.com/?lang-en="
                className="text-2xl hover:text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiSpacex />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-2xl hover:text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-2xl hover:text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiLinkedin />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              Or email us directly at{" "}
              <a
                href="mailto:supporthandFullhands@gmail.com"
                className="text-blue-500"
              >
                supporthandFullhands@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
