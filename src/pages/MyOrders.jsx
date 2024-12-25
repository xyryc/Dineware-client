import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";


const MyOrders = () => {
  const queryClient = useQueryClient(); // Use the existing QueryClient
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch orders
  const { data: myOrders, isFetching } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/orders/${user?.email}`);
      return data;
    },
  });

  // Mutation for deleting an order
  const { mutate, isLoading } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/orders/delete/${id}`);
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

  // Define a custom animation (optional)
  const fadeInUp = keyframes`
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
      `;

  console.log(myOrders);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold">My Orders</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>My Orders</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto lg:overflow-hidden my-6">
        <table className="table">
          {/* Table head */}
          <thead className="bg-gray-800 text-white font-dancing-script">
            <tr>
              <th></th>
              <th>Index</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Time</th>
              <th>Food Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with reveal */}
            {myOrders?.map((item, index) => (
              <tr key={item._id}>
                <td></td>

                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {index + 1}
                  </Reveal>
                </td>

                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.foodImage} alt={item.foodName} />
                      </div>
                    </div>
                  </Reveal>
                </td>

                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {item.foodName}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {`x` + item.purchase_quantity}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {`$` + item.order_price}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {moment(item.buyingDate).format("MMMM Do YYYY, h:mm a")}
                  </Reveal>
                </td>

                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {item.buyerName}
                  </Reveal>
                </td>

                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    <button
                      className="text-lg"
                      onClick={() => mutate(item._id)}
                    >
                      <RiDeleteBin6Line/>
                    </button>
                  </Reveal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;

// <div key={order._id} className="flex gap-3 items-center">
//   <p>{order.foodName}</p>
//   <button
//     className="btn btn-xs btn-outline"
//     onClick={() => mutate(order._id)} // Pass the order ID to the mutation
//   >
//     x
//   </button>
// </div>
