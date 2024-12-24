import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddFood = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (foodData) => {
      await axiosSecure.post(`/add-food`, foodData);
    },

    onSuccess: () => {
      toast.success("Food added to database");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      navigate("/my-foods");
    },
    onError: () => {
      toast.error("Error occured while adding to db");
    },
  });

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
      purchase_count: 0,
      email,
      username,
    };

    await mutateAsync(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] ">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700">Add a Food</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-gray-700 ">Food Name</label>
              <input
                name="food_title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700">Price</label>
              <input
                name="price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700">Available Quantity</label>
              <input
                name="quantity"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 ">Food Category</label>
              <select
                name="food_category"
                className="border p-2 rounded-md"
                defaultValue=""
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
              <label className="text-gray-700 ">Food Origin (Country)</label>
              <select
                name="food_origin"
                className="border p-2 rounded-md"
                defaultValue=""
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
            <label className="text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                readOnly
                className="block  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 ">Username</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                readOnly
                className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {isLoading ? "Adding Food..." : "Add Food"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddFood;
