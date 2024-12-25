import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
      toast.error("Error occurred while adding to db");
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
    <div>
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold text-lg">Add Food</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Add Food</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-6">
        <section className="p-4 md:p-6 mx-auto bg-base-100 text-base-content rounded-md shadow-md w-full max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Add a Food</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  name="food_title"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Available Quantity</span>
                </label>
                <input
                  name="quantity"
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Food Category</span>
                </label>
                <select
                  name="food_category"
                  className="select select-bordered w-full"
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

              <div>
                <label className="label">
                  <span className="label-text">Food Origin (Country)</span>
                </label>
                <select
                  name="food_origin"
                  className="select select-bordered w-full"
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
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                name="image"
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div className="mt-4">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? "Adding Food..." : "Add Food"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddFood;
