import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const PurchaseFood = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

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
      await axios.post(`${import.meta.env.VITE_API_URL}/order`, orderData);
    },

    onSuccess: () => {
      toast.success("Order placed successfully!");
    },

    onError: () => {
      toast.error("Failed to place order");
    },
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const purchase_quantity = form.purchase_quantity.value;

    const purchaseData = {
      foodName: singleFood.foodName,
      order_price: singleFood.price * purchase_quantity,
      purchase_quantity,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyingDate: Date.now(),
    };

    // send order to backend
    await mutateAsync(purchaseData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Food</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              value={singleFood.foodName}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              value={`$${singleFood.price}`}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Available Quantity
            </label>
            <input
              type="text"
              value={singleFood.quantity}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              name="purchase_quantity"
              type="number"
              defaultValue={1}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Buyer Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Buyer Email
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm`}
            >
              {isLoading ? "Purchasing" : "Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseFood;
