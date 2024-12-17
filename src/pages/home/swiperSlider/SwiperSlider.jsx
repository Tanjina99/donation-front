import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaHandHoldingHeart } from "react-icons/fa6";

const SwiperSlider = () => {
  return (
    <div className="relative">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper items-center"
      >
        <SwiperSlide>
          <div className="relative w-full h-[85vh] sm:h-[45vh] md:h-[50vh] lg:h-[80vh] xl:h-[90vh]">
            <img
              src="images/slider/slider1.png"
              alt="Slide 1"
              className="w-full h-full object-cover absolute top-0 left-0 opacity-70"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h1 className="text-4xl sm:text-2xl md:text-3xl font-bold">
                  Empower Communities
                </h1>
                <p className="text-lg sm:text-sm mt-4">
                  Join us in creating opportunities and transforming lives
                  through your support.
                </p>
                <div className="mt-6 flex justify-center">
                  <button className="btn btn-outline btn-success opacity-100 relative flex items-center justify-center px-6 py-3 sm:px-4 sm:py-2 bg-green-800 text-white">
                    <span className="text-white font-bold text-xl sm:text-base">
                      Donate
                    </span>{" "}
                    <span className="ml-2">
                      <FaHandHoldingHeart className="text-white font-bold text-xl sm:text-base" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[85vh] sm:h-[45vh] md:h-[50vh] lg:h-[80vh] xl:h-[90vh]">
            <img
              src="images/slider/slider2.png"
              alt="Slide 2"
              className="w-full h-full object-cover absolute top-0 left-0 opacity-70"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h1 className="text-4xl sm:text-2xl md:text-3xl font-bold">
                  Support Education
                </h1>
                <p className="text-lg sm:text-sm mt-4">
                  Help children achieve their dreams by providing access to
                  quality education.
                </p>
                <div className="mt-6 flex justify-center">
                  <button className="btn btn-outline btn-success opacity-100 relative flex items-center justify-center px-6 py-3 sm:px-4 sm:py-2 bg-green-800 text-white">
                    <span className="text-white font-bold text-xl sm:text-base">
                      Donate
                    </span>{" "}
                    <span className="ml-2">
                      <FaHandHoldingHeart className="text-white font-bold text-xl sm:text-base" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[85vh] sm:h-[45vh] md:h-[50vh] lg:h-[80vh] xl:h-[90vh]">
            <img
              src="images/slider/slider4.png"
              alt="Slide 3"
              className="w-full h-full object-cover absolute top-0 left-0 opacity-70"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h1 className="text-4xl sm:text-2xl md:text-3xl font-bold">
                  Make a Difference
                </h1>
                <p className="text-lg sm:text-sm mt-4">
                  Your contribution can change lives and bring smiles to those
                  in need.
                </p>
                <div className="mt-6 flex justify-center">
                  <button className="btn btn-outline btn-success opacity-100 relative flex items-center justify-center px-6 py-3 sm:px-4 sm:py-2 bg-green-800 text-white">
                    <span className="text-white font-bold text-xl sm:text-base">
                      Donate
                    </span>{" "}
                    <span className="ml-2">
                      <FaHandHoldingHeart className="text-white font-bold text-xl sm:text-base" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
