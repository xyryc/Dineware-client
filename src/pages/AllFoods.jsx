import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import FoodCard from "../components/FoodCard";

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

  const handleReset = () => {
    setFilter("");
    setSearch("");
    setSort("");
  };

  return (
    <div className="min-h-[90vh] container mx-auto px-4">
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
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-6 font-dancing-script">
        <div>
          <select
            className="p-4 rounded-lg outline-1 outline"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="" disabled>
              Filter by Origin
            </option>
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

        <div className="flex p-1 overflow-hidden rounded-lg outline-1 outline">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            placeholder="Search by Food Name"
            aria-label="Search by Food Name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <button className="btn btn-neutral rounded-md">Search</button>
        </div>

        <div>
          <select
            name="category"
            id="category"
            className="p-4 rounded-md outline-1 outline"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
          >
            <option value="" disabled>
              Sort By Price
            </option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <button onClick={handleReset} className="btn btn-neutral rounded-md">
          Reset
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : !foods?.length ? (
        <p className="text-3xl font-bold text-center py-10">No foods found!</p>
      ) : (
        <Fade triggerOnce>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {foods?.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default AllFoods;
