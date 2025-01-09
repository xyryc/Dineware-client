import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import FoodCard from "./FoodCard";

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
    <div id="topSelling" className="my-24">
      <h1 className="text-center font-semibold text-5xl mb-10 font-dancing-script">
        Our Top Selling Foods
      </h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Fade triggerOnce>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {topFoods?.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </Fade>
      )}

      <p className="text-center mt-10">
        <Link to="/foods" className="btn btn-neutral rounded-full">
          See All
        </Link>
      </p>
    </div>
  );
};

export default TopSellingFoods;
