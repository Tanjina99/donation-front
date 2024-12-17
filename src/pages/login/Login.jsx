import React, { useState } from "react";
import Lottie from "lottie-react";
import login from "../../../public/login.json";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const user = { email, password };

    console.log("User Data to Send: ", user);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signin",
        user,
        { withCredentials: true }
      );
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid login credentials or server error", error);
    }
  };

  return (
    <div className="hero min-h-screen bg-green-300 flex justify-center items-center">
      <div className="card bg-white shadow-2xl p-6 w-full max-w-4xl flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <Lottie
            animationData={login}
            loop={true}
            className="w-100 h-100 lg:w-[500px] lg:h-[500px]"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black">Login now</h1>
            <p className="py-4 text-black">
              Join us in making a difference by logging in and supporting our
              cause. Your contribution matters.
            </p>
          </div>

          <form onSubmit={onFinish} className="card-body py-2">
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered input-md bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
              />
            </div>
            <div className="form-control mb-3 relative">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type={isVisible ? "text" : "password"}
                placeholder="password"
                className="input input-bordered input-md bg-white w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <FaRegEyeSlash className="text-gray-500" />
                ) : (
                  <FaRegEye className="text-gray-500" />
                )}
              </button>
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-black"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-md text-white"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-black">
              Don't have an account?{" "}
              <a href="/register" className="link link-hover text-blue-500">
                Register now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
