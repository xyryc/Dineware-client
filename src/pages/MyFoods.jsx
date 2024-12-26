import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { MdOutlineEdit } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: myFoods, isLoading } = useQuery({
    queryKey: ["myFoods"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/foods/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // console.log(myFoods);

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

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center my-2">
        <h1 className="font-bold">My Foods</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>My Foods</a>
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
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Added by</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with reveal */}
            {myFoods?.map((item, index) => (
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
                    {item.foodCategory}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {item.price}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {item.quantity}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 100}
                    duration={500}
                  >
                    {item.username || "-"}
                  </Reveal>
                </td>
                <td>
                  <Reveal
                    keyframes={fadeInUp}
                    delay={index * 60}
                    duration={500}
                  >
                    <Link
                      to={`/my-foods/update/${item._id}`}
                      className="btn btn-sm"
                    >
                      <MdOutlineEdit />
                    </Link>
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

export default MyFoods;
