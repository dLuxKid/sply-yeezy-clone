import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/useCartContext";

import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import ErrorPage from "./pages/error";
import Home from "./pages/home";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "cart", element: <Cart /> },
  { path: "checkout", element: <Checkout /> },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
