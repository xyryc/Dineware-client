import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import PurchaseFood from "../pages/PurchaseFood";
import PrivateRoutes from "./PrivateRoutes";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";
import UpdateFood from "../pages/UpdateFood";
import MyOrders from "../pages/MyOrders";
import Gallery from "../pages/Gallery";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/foods",
        element: <AllFoods />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/food/:id",
        element: <FoodDetails />,
      },
      {
        path: "/food/purchase/:id",
        element: (
          <PrivateRoutes>
            <PurchaseFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoutes>
            <MyFoods />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-foods/update/:id",
        element: (
          <PrivateRoutes>
            <UpdateFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoutes>
            <MyOrders />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
