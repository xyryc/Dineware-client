import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateFood = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: myFood, isLoading } = useQuery({
    queryKey: ["myFood"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (foodData) => {
      await axiosSecure.put(`/food/update/${id}`, foodData);
    },

    onSuccess: () => {
      toast.success("Food data updated.");
      queryClient.invalidateQueries({ queryKey: ["myFoods"] });
      navigate("/my-foods");
    },

    onError: () => {
      toast.error("Error occurred while updating.");
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.food_title.value;
    const foodImage = form.image.value;
    const foodCategory = form.food_category.value;
    const quantity = parseFloat(form.quantity.value);
    const price = parseFloat(form.price.value);
    const foodOrigin = form.food_origin.value;
    const description = form.description.value;
    const email = user?.email;
    const username = user?.displayName;

    const formData = {
      foodName,
      foodImage,
      foodCategory,
      quantity,
      price,
      foodOrigin,
      description,
      email,
      username,
    };

    await mutateAsync(formData);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold text-lg">Update Food</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Update Food</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
        <section className="p-2 md:p-6 mx-auto bg-base-100 rounded-md shadow-md w-full max-w-4xl">
          <h2 className="text-lg font-semibold ">
            Update food data: {myFood.foodName}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="">Food Name</label>
                <input
                  defaultValue={myFood.foodName}
                  name="food_title"
                  type="text"
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div>
                <label className="">Price</label>
                <input
                  defaultValue={myFood.price}
                  name="price"
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div>
                <label className="">Available Quantity</label>
                <input
                  defaultValue={myFood.quantity}
                  name="quantity"
                  type="number"
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="">Food Category</label>
                <select
                  name="food_category"
                  className="select select-bordered w-full mt-2"
                  defaultValue={myFood.foodCategory}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                  <option value="Salad">Salad</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="">Food Origin (Country)</label>
                <select
                  name="food_origin"
                  className="select select-bordered w-full mt-2"
                  defaultValue={myFood.foodOrigin}
                >
                  <option value="" disabled>
                    Select Origin
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
            </div>

            <div className="mt-4">
              <label className="">Image URL</label>
              <input
                defaultValue={myFood.foodImage}
                type="text"
                name="image"
                className="input input-bordered w-full mt-2"
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="" htmlFor="description">
                Description
              </label>
              <textarea
                defaultValue={myFood.description}
                className="textarea textarea-bordered w-full mt-2"
                name="description"
                id="description"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div>
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`btn bg-neutral text-white btn-outline ${
                  isLoading && "loading"
                }`}
              >
                {isLoading ? "Updating..." : "Update Food Data"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateFood;
