/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";

const FoodCard = ({food}) => {
    return (
        <motion.div
        key={food._id}
        className="rounded-md p-4  bg-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* product image */}
        <img
          alt={food.foodName}
          src={food.foodImage}
          className="rounded-md h-[280px] w-full object-cover"
        />

        {/* product details */}
        <div className="mt-3">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            {food.foodName}
            <span className="text-xs flex items-center gap-1 badge rounded-full">
              <IoFastFoodSharp />
              {food.foodOrigin}
            </span>
          </h3>
          <p className="my-[10px]">{food.description.split(" ").slice(0, 10).join(" ")}...</p>

          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-[0.9rem] text-gray-500 flex items-center gap-1"></p>
              <p className="text-2xl font-bold">
                $ {food.price} <span className="text-sm">({food.purchase_count} sold)</span>
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
    );
};

export default FoodCard;