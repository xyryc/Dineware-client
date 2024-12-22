import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiCategory } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const FoodDetails = () => {
  const { id } = useParams();

  const { data: singleFood, isLoading } = useQuery({
    queryKey: ["singleFood"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="breadcrumbs text-sm pt-2 pb-6">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a>{singleFood.foodCategory}</a>
          </li>
          <li>
            <a>{singleFood.foodName}</a>
          </li>
        </ul>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 justify-items-center place-items-center gap-10">
        <div className="w-full border h-96 flex justify-center items-center overflow-hidden bg-base-200">
          <img
            className="object-scale-down h-full"
            src={singleFood.foodImage}
            alt={singleFood.foodName}
          />
        </div>

        <div className="w-full flex flex-col h-full">
          <div>
            <p className="flex items-center gap-2">
              <BiCategory /> {singleFood.foodCategory}
            </p>
            <h1 className="text-5xl font-bold font-bebas-neue my-2">
              {singleFood.foodName}
            </h1>
            <p className="text-3xl">
              ₽ <span className="font-black">{singleFood.price}</span>
            </p>
            {/* <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    color={index < rating ? "#2171ad" : "#E5E7EB"}
                  />
                ))}
              </div>
              <p>{rating}</p>
            </div> */}

            <div className="divider"></div>
          </div>

          <ul className="flex-grow space-y-2 list-disc list-inside text-balance font-light">
            <li>Description: {singleFood.description}</li>
            <li>Food Origin: {singleFood.foodOrigin}</li>
            <li>Purchase count: {singleFood.purchase_count}</li>
            <li>Available Quantity: {singleFood.quantity}</li>
          </ul>

          <Link
            to={`/food/purchase/${singleFood._id}`}
            className="btn btn-outline mt-3"
          >
            Purchase
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
