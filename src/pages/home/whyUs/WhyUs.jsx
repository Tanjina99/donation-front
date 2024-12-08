import React from "react";
import { FaPlay } from "react-icons/fa";

const WhyUs = () => {
  return (
    <div>
      <section className="why-choose-us py-16 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-black mb-4">Why Choose Us?</h2>
          <p className="text-lg text-black mb-6">
            Watch this short video to learn how your donation makes a difference
            and how easy it is to contribute to a great cause.
          </p>
          <p className="mt-[-10px] text-sm text-black">
            Your generosity helps us create a better tomorrow, today.
          </p>
          <div className="relative inline-block">
            <video className="rounded-lg shadow-lg mt-4" width="600" controls>
              <source src="images/video/whyUsDonation.webm" type="video/webm" />
            </video>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* <button className="p-4 rounded-full bg-primary_color text-white text-3xl">
                <FaPlay />
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
