import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";

const TopSellingFoods = () => {
  const { data: topFoods = [], isLoading } = useQuery({
    queryKey: ["topSelling"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/top-selling`
      );
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-6">Top Selling Foods</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Fade triggerOnce>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 container mx-auto px-4">
            {topFoods?.map((food) => (
              <motion.div
                key={food._id}
                className="border border-gray-300 rounded-md p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* product image */}
                <img
                  alt={food.foodName}
                  src={food.foodImage}
                  className="rounded-md h-[250px] w-full object-cover"
                />

                {/* product details */}
                <div className="mt-3">
                  <h3 className="text-[1.1rem] font-semibold">
                    {food.foodName}
                    <span className="text-sm ml-1">({food.quantity})</span>
                  </h3>
                  <p>{food.description.split(" ").slice(0, 8).join(" ")}...</p>

                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="text-[0.9rem] text-gray-500 flex items-center gap-1">
                        <IoFastFoodSharp />
                        {food.foodCategory}
                      </p>
                      <p className="text-[1rem] font-semibold mt-1 text-[#0FABCA]">
                        $ {food.price}
                      </p>
                    </div>

                    <Link
                      to={`/food/${food._id}`}
                      className="py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Fade>
      )}

      <p className="text-center my-10">
        <Link to="/foods" className="btn btn-neutral">
          See All
        </Link>
      </p>
    </div>
  );
};

export default TopSellingFoods;
