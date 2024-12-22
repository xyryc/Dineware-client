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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        path: "/add-food",
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
