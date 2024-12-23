import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoFastFoodSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllFoods = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["foods", filter, search, sort],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/foods?filter=${filter}&search=${search}&sort=${sort}`
      );
      return data;
    },
  });

  console.log(foods);

  const handleReset = () => {
    setFilter("");
    setSearch("");
    setSort("");
  };

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

      {/* searchbar */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-6">
        <div>
          <select
            className="border p-4 rounded-lg"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">Filter by Origin</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Palestine">Palestine</option>
            <option value="Mexico">Mexico</option>
            <option value="Ireland">Ireland</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Thailand">Thailand</option>
            <option value="Russia">Russia</option>
            <option value="China">China</option>
            <option value="Spain">Spain</option>
          </select>
        </div>

        <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            placeholder="Enter Food Name"
            aria-label="Enter Food Name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div>

        <div>
          <select
            name="category"
            id="category"
            className="border p-4 rounded-md"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
          >
            <option value="">Sort By Price</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : !foods?.length ? (
        <p className="text-3xl font-bold text-center py-10">No foods found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
          {foods?.map((food) => (
            <div
              key={food._id}
              className="border border-gray-300 rounded-md p-4"
            >
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
      )}
    </div>
  );
};

export default AllFoods;
