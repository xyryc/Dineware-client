import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FaStar } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="py-24">
      <div className="text-center mb-10 font-dancing-script">
        <h1 className="text-5xl font-semibold">What Our Clients Are Saying</h1>
      </div>

      <Fade cascade damping={0.1}>
        <Marquee speed={30}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col w-96 text-center items-center mx-10 bg-white/10 p-6 rounded-md"
            >
              <div className="flex gap-3">
                <img
                  className="w-[74px] h-[74px] rounded-full object-cover"
                  src={review.image}
                  alt={review.name}
                />
                <div className="text-left">
                  <h3 className="font-bold text-lg">{review.name}</h3>
                  <p className="text-sm mb-2">{review.profession}</p>
                  <div className="flex text-yellow-500 space-x-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <p className="text-lg font-light text-pretty font-inter">
                &quot;{review.review} &quot;
              </p>
            </div>
          ))}
        </Marquee>
      </Fade>
    </div>
  );
};

export default Reviews;
