import { useState, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PurchaseFood = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: singleFood, isFetching } = useQuery({
    queryKey: ["singleFood"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      return data;
    },
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (orderData) => {
      await axiosSecure.post(`/orders`, orderData);
    },
    onSuccess: () => {
      toast.success("Order placed successfully!");
      navigate("/my-orders");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });

  const [quantity, setQuantity] = useState(1);

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity > singleFood.quantity) {
      return toast.error("You can't buy more than the available quantity!");
    }

    const purchaseData = {
      foodImage: singleFood.foodImage,
      foodName: singleFood.foodName,
      order_price: singleFood.price * quantity,
      purchase_quantity: quantity,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyingDate: Date.now(),
    };

    // Send order to backend
    await mutateAsync(purchaseData);
  };

  // Validation
  const isNotAvailable = singleFood?.quantity === 0;
  const isOwnFood = singleFood?.email === user?.email;

  return (
    <div className="min-h-screen bg-base-100 mx-4">
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold">Purchase: {singleFood.foodName}</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/foods">All Foods</Link>
            </li>
            <li>
              <Link to={`/food/${singleFood._id}`}>{singleFood.foodName}</Link>
            </li>
            <li>
              <a>Purchase</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-lg p-4 sm:p-8 bg-white/10 ">
        <h1 className="text-2xl font-bold text-base-content">Purchase Food</h1>

        <div className="my-3 text-sm text-error">
          <p className="font-medium">
            {isOwnFood && "You can't buy your own food"}
          </p>
          <p className="font-medium">
            {isNotAvailable && "The food item is not available for purchase"}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <img src={singleFood.foodImage} className="w-full sm:w-1/2 rounded-md" />

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            <div>
              <label className="block text-sm font-medium text-base-content">
                Food Name
              </label>
              <input
                type="text"
                value={singleFood.foodName}
                readOnly
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content">
                Available Quantity
              </label>
              <input
                type="text"
                value={singleFood.quantity}
                readOnly
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content">
                Price (Per Unit)
              </label>
              <input
                type="text"
                value={`$${singleFood.price}`}
                readOnly
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content">
                Quantity
              </label>
              <input
                name="purchase_quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-base-content">
                Total Price (Quantity * Price Per Unit)
              </label>
              <input
                type="text"
                value={`$${(singleFood.price * quantity).toFixed(2)}`}
                readOnly
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content">
                Buyer Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content">
                Buyer Email
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="p-3 mt-1 block w-full rounded-md border border-base-300 bg-base-100 text-base-content shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className={`btn btn-outline
              ${
                (isOwnFood || isNotAvailable) &&
                "btn-disabled bg-base-300 cursor-not-allowed text-base-content"
              }
              `}
              >
                {isOwnFood || isNotAvailable ? "Unavailable" : "Purchase"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFood;
