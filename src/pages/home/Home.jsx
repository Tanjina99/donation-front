import React from "react";
import Swiper from "swiper";
import SwiperSlider from "./swiperSlider/SwiperSlider";
import DonationCard from "./donationCard/DonationCard";
import Advertise from "./advertise/Advertise";
import WhyUs from "./whyUs/WhyUs";
import RaiseFund from "./raiseFund/RaiseFund";
import Testimonial from "./testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <SwiperSlider />
      <Advertise />
      <DonationCard />
      <WhyUs />
      <RaiseFund />
      <Testimonial />
    </div>
  );
};

export default Home;
