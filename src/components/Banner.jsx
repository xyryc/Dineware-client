// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <img
            src="https://i.ibb.co.com/6XqYTBv/image.png"
            className="w-full h-[90vh] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10"></div>

          <div className="absolute top-[10%] left-[5%] text-white">
            <h1 className="font-black text-5xl xl:text-[66px] xl:leading-[96px] w-3/5">
              Welcome!
              <br />
              We Made Delicious Food for You
            </h1>
            <p className="text-sm lg:text-xl mt-3 mb-4 xl:mb-10 w-3/6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <a
              className="btn btn-primary bg-white text-black font-bold border-none rounded-full"
              href="#topSelling"
            >
              Order Online
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
