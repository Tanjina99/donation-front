import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonial } from "../../../staticData/Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Testimonial = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-black mb-8">
          What Our Donors & Fundraisers Say
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonial.map((testimonials) => (
            <SwiperSlide key={testimonials.id}>
              <div className="bg-green-300 shadow-lg rounded-lg p-6 flex flex-col items-center">
                <img
                  src={testimonials.photo}
                  alt={testimonials.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">
                  {testimonials.name}
                </h3>
                <p className="text-sm text-black italic mb-4">
                  <FaQuoteLeft className="inline-block mr-2 text-black" />"
                  {testimonials.quote}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
