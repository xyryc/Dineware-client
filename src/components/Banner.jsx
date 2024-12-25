// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const slider = [
  {
    id: 1,
    image:
      "https://i.ibb.co.com/LP904BW/popular-dish-is-chakapuli-this-is-lamb-stewed-with-herbs-spices-white-wine-clay-plate.jpg",
    title: "Savor the Flavors of Exquisite Culinary Art",
    description:
      "Experience a delightful journey of taste with our chef-crafted specialties made with the finest ingredients.",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co.com/8048ZHW/forkful-steaming-spaghetti-with-shiny-noodles-hint-tomato-sauce.jpg",
    title: "Indulge in the Perfect Plate of Comfort Food",
    description:
      "From classic recipes to modern creations, every dish is made with love and a touch of elegance.",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/CnQDNfk/biriyani.jpg",
    title: "Celebrate Tradition with Authentic Biriyani",
    description:
      "Enjoy the rich, aromatic flavors of our biriyani, prepared with care to bring you a taste of heritage.",
  },
  {
    id: 4,
    image:
      "https://i.ibb.co.com/YksHdPx/delicious-italian-pizza-with-vegetables-generated-by-ai.jpg",
    title: "Relish the Taste of Authentic Italian Pizza",
    description:
      "Delight your senses with our freshly baked pizzas topped with vibrant vegetables and rich flavors.",
  },
];

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slider.map((item) => (
          <SwiperSlide className="relative" key={item.id}>
            <img src={item.image} className="w-full h-[90vh] object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10"></div>

            <div className="absolute top-[10%] left-[5%] text-white">
              <h1 className="font-black text-5xl xl:text-[66px] xl:leading-[96px] w-3/4 md:w-6/12  capitalize">
                {item.title}
              </h1>
              <p className="text-sm xl:text-xl my-4 xl:mb-10 w-3/6 ">
                {item.description}
              </p>
              <a
                className="btn bg-white text-black font-bold border-none rounded-full hover:text-white"
                href="#topSelling"
              >
                Order Online
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
