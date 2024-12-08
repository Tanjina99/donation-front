import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Lottie from "lottie-react";
import register from "../../../public/register.json";
import { useNavigate } from "react-router";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();
    const form = e.target;

    const fullName = form.fullname.value;
    const imageUrl = form.imageurl.value;
    const email = form.email.value;
    const password = form.password.value;

    const userData = {
      fullName,
      imageUrl,
      email,
      password,
      role: "user",
    };

    console.log("User Data to Send: ", userData);

    axios
      .post("http://localhost:5000/api/signup", userData)
      .then((response) => {
        console.log("Response", response);
        toast.success("User registered successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error("User registration failed");
      });
  };

  return (
    <div className="hero min-h-screen bg-green-300 flex justify-center items-center">
      <div className="bg-white shadow-2xl p-6 w-full max-w-4xl flex flex-col lg:flex-row-reverse rounded-lg">
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <Lottie
            animationData={register}
            loop={true}
            className="w-100 h-100 lg:w-[500px] lg:h-[500px]"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black">Sign Up</h1>
            <p className="py-4 text-black">
              Join us and make a difference by creating an account.
            </p>
          </div>

          <form onSubmit={onFinish} className="space-y-4">
            <div className="form-control">
              <label className="block text-black text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-md text-black"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                name="fullname"
              />
            </div>

            <div className="form-control">
              <label className="block text-black text-sm font-semibold mb-2">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-md text-black"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                name="imageurl"
              />
            </div>

            <div className="form-control">
              <label className="block text-black text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-md text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
              />
            </div>

            <div className="form-control">
              <label className="block text-black text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-md text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
              />
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn w-full p-3 btn-primary btn-md text-white"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-black">Already have an account?</p>
            <a href="/login" className="text-blue-500 hover:underline">
              Login Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
