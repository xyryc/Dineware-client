import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";

const UpdateFood = () => {
  const queryClient = useQueryClient();

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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/food/update/${id}`,
        foodData
      );
    },

    onSuccess: () => {
      toast.success("Food data updated.");
      queryClient.invalidateQueries({ queryKey: ["myFoods"] });
      navigate("/my-foods");
    },

    onError: () => {
      toast.error("Error occured while updating.");
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
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] ">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700">
          Update food data: {myFood.foodName}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-gray-700 ">Food Name</label>
              <input
                defaultValue={myFood.foodName}
                name="food_title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700">Price</label>
              <input
                defaultValue={myFood.price}
                name="price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700">Available Quantity</label>
              <input
                defaultValue={myFood.quantity}
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
                defaultValue={myFood.foodCategory}
              >
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Palestinian">Palestinian</option>
                <option value="Mexican">Mexican</option>
                <option value="Irish">Irish</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Thai">Thai</option>
                <option value="Russian">Russian</option>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 ">Food Origin (Country)</label>
              <select
                name="food_origin"
                className="border p-2 rounded-md"
                defaultValue={myFood.foodOrigin}
              >
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
              defaultValue={myFood.foodImage}
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
              defaultValue={myFood.description}
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
              {isLoading ? "Updating..." : "Update Food Data"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateFood;