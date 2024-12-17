import React from "react";
import Lottie from "lottie-react";
import errorpage from "../../public/errorpage.json";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <div className="h-96 w-96 mx-auto mt-36">
        {/* <div className="flex justify-center items-center">
          <h1 className="mt-4 text-xl font-bold text-black">
            This Page is Broken
          </h1>
        </div> */}

        <Lottie animationData={errorpage} loop={true} />
        <div className="flex justify-center items-center">
          <Link to="/">
            <butto className="btn btn-accent">Go Home</butto>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
