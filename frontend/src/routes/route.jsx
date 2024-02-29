import Cart from "../pages/Cart";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";
import Shipping from "../pages/Shipping";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const route = [
    {
        path: "/",
        element: <HomePage/>,
      },
    {
        path: "/signup",
        element: <SignUp/>,
      },
      {
        path: "/signin",
        element: <SignIn/>,
      },
      {
        path: "/product/:_id",
        element: <ProductDetails/>,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/shipping",
        element: <Shipping/>,
      },
]

export default route;