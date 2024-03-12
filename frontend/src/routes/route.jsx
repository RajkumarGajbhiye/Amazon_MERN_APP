import Cart from "../pages/Cart";
import HomePage from "../pages/HomePage";
import Payment from "../pages/Payment";
import PlaceOrder from "../pages/PlaceOrder";
import ProductDetails from "../pages/ProductDetails";
import Shipping from "../pages/Shipping";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Success from "../pages/Success";
import UpdateUserProfile from "../pages/UpdateUserProfile";
import UserProfile from "../pages/UserProfile";

const route = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/product/:_id",
    element: <ProductDetails />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/shipping",
    element: <Shipping />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/placeorder",
    element: <PlaceOrder />,
  },
  {
    path: "/checkout-success",
    element: <Success />,
  },
  {
    path: "/user_profile",
    element: <UserProfile/>,
  },
  {
    path:"/update/user/profile",
    element:<UpdateUserProfile/>
  }
];

export default route;
