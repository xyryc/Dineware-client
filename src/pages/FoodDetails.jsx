import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoFastFoodSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { AiTwotoneFire } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { PiMapPinArea } from "react-icons/pi";

const FoodDetails = () => {
  const { id } = useParams();

  const { data: singleFood, isLoading } = useQuery({
    queryKey: ["singleFood"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(singleFood);

  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold">{singleFood.foodName}</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/foods">All Foods</Link>
            </li>
            <li>
              <a>{singleFood.foodName}</a>
            </li>
          </ul>
        </div>
      </div>

      <motion.div
        className="min-h-screen bg-base-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto bg-base-200 shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <Fade direction="left" duration={800}>
              <img
                src={singleFood.foodImage}
                alt={singleFood.foodName}
                className="object-cover w-full h-full"
              />
            </Fade>

            {/* Details Section */}
            <Fade direction="right" duration={800}>
              <div className="p-6 md:p-10 space-y-6">
                {/* Food Name and Price */}
                <div className="space-y-2">
                  <h1 className="text-4xl font-dancing-script font-bold">
                    {singleFood.foodName}
                  </h1>
                  <p className="text-2xl font-black">$ {singleFood.price}</p>
                </div>

                <div className="divider"></div>

                {/* Food Description and Stats */}
                <div className="space-y-4">
                  <p className="text-pretty">{singleFood.description}</p>

                  <p className="flex items-center gap-3 text-lg">
                    <IoFastFoodSharp className=" text-2xl" />
                    <span className="font-semibold">Category:</span>{" "}
                    <span className="text-base-content font-poppins">
                      {singleFood.foodCategory}
                    </span>
                  </p>

                  <p className="flex items-center gap-3 text-lg">
                    <PiMapPinArea className=" text-2xl" />
                    <span className="font-semibold">Food Origin:</span>{" "}
                    <span className="text-base-content font-poppins">
                      {singleFood.foodOrigin}
                    </span>
                  </p>

                  <p className="flex items-center gap-3 text-lg">
                    <AiTwotoneFire className=" text-2xl" />
                    <span className="font-semibold">Sold:</span>{" "}
                    <span className="text-base-content font-poppins">
                      {singleFood.purchase_count}
                    </span>
                  </p>

                  <p className="flex items-center gap-3 text-lg">
                    <GiShoppingCart className=" text-2xl" />
                    <span className="font-semibold">
                      Available Quantity:
                    </span>{" "}
                    <span className="text-base-content font-poppins">
                      {singleFood.quantity}
                    </span>
                  </p>
                </div>

                {/* Action Button */}
                <Link
                  to={`/food/purchase/${singleFood._id}`}
                  className="btn btn-primary btn-lg mt-4 w-full md:w-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  Purchase Now
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodDetails;
