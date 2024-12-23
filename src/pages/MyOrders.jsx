import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const MyOrders = () => {
  const queryClient = useQueryClient(); // Use the existing QueryClient
  const { user } = useContext(AuthContext);

  // Fetch orders
  const { data: myOrders, isFetching } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${user?.email}`
      );
      return data;
    },
  });

  // Mutation for deleting an order
  const { mutate, isLoading } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/orders/delete/${id}`);
    },
    onSuccess: () => {
      toast.success("Order deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: () => {
      toast.error("Error occurred while deleting the order.");
    },
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {myOrders?.map((order) => (
        <div key={order._id} className="flex gap-3 items-center">
          <p>{order.foodName}</p>
          <button
            className="btn btn-xs btn-outline"
            onClick={() => mutate(order._id)} // Pass the order ID to the mutation
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
