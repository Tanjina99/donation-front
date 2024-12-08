import React from "react";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { SiSpacex } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-green-300 text-black">
        <div className="container mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
            <div className="text-center">
              <h6 className="footer-title text-xl font-bold mb-4">
                Quick Links
              </h6>
              <div className="flex flex-col space-y-2 text-lg">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <Link to="/donation" className="hover:underline">
                  Donation
                </Link>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
                <Link to="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
                <Link to="/fundraising" className="hover:underline">
                  Raising Fund
                </Link>
              </div>
            </div>

            <div className="text-center">
              <h6 className="footer-title text-xl font-bold mb-4">Follow Us</h6>
              <div className="flex justify-center space-x-4 text-lg">
                <a
                  href="https://www.facebook.com"
                  className="text-3xl hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CiFacebook />
                </a>
                <a
                  href="https://x.com/?lang-en="
                  className="text-3xl hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiSpacex />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="text-3xl hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com"
                  className="text-3xl hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CiLinkedin />
                </a>
              </div>
            </div>

            <div className="text-center">
              <h6 className="footer-title text-xl font-bold mb-0">
                Newsletter
              </h6>
              <form className="flex flex-col items-center">
                <fieldset className="form-control w-full max-w-sm">
                  <label className="label flex justify-center">
                    <span className="label-text text-lg text-black">
                      Enter your email address
                    </span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-center w-full">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered mb-2 sm:mb-0 sm:mr-2 w-full text-lg bg-white text-black"
                    />
                    <button className="btn btn-success w-full sm:w-auto text-lg font-semibold text-white">
                      Subscribe
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

          <hr className="border-green-800 border w-full sm:w-3/4 lg:w-2/4 mb-0 mt-2 mx-auto" />

          <div className="mt-8 text-center">
            <p className="text-sm font-semibold">
              © 2024 GiveHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
