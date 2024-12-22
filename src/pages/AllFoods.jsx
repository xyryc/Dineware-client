import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoFastFoodSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const AllFoods = () => {
  const { data: foods, isLoading } = useQuery({
    queryKey: ["food"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold">All Foods</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>All Foods</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
        {foods?.map((food) => (
          <div key={food._id} className="border border-gray-300 rounded-md p-4">
            {/* product image */}
            <img
              alt={food.foodName}
              src={food.foodImage}
              className="rounded-md h-[250px] w-full object-scale-down"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
