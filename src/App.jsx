import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/useCartContext";

import Cart from "./pages/cart";
import ErrorPage from "./pages/error";
import Home from "./pages/home";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "cart", element: <Cart /> },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
