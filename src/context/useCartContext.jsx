import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [], totalQuantity: 0 });

  const addToCart = ({ id, name, size, price, img }) => {
    const prevItemsInCart = [...cart.cartItems];
    const isItemAvailable = prevItemsInCart.find(
      (item) => item.id === id && item.size === size
    );
    const updatedTotalQty = cart.totalQuantity + 1;
    if (!isItemAvailable) {
      const updatedCartItem = prevItemsInCart.concat({
        id,
        name,
        price,
        size,
        img,
        quantity: 1,
      });
      setCart({
        cartItems: updatedCartItem,
        totalQuantity: updatedTotalQty,
      });
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: updatedCartItem,
          totalQuantity: updatedTotalQty,
        })
      );
    } else {
      const updatedCartItem = prevItemsInCart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart({
        cartItems: updatedCartItem,
        totalQuantity: updatedTotalQty,
      });
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: updatedCartItem,
          totalQuantity: updatedTotalQty,
        })
      );
    }
  };

  const increaseItemQuantity = ({ id, size }) => {
    const updatedTotalQty = cart.totalQuantity + 1;
    const prevItemsInCart = [...cart.cartItems];

    const updatedCartItem = prevItemsInCart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart({
      cartItems: updatedCartItem,
      totalQuantity: updatedTotalQty,
    });
    localStorage.setItem(
      "cart",
      JSON.stringify({
        cartItems: updatedCartItem,
        totalQuantity: updatedTotalQty,
      })
    );
  };

  const decreaseItemQuantity = ({ id, size, quantity }) => {
    const updatedTotalQty = cart.totalQuantity - 1;
    const prevItemsInCart = [...cart.cartItems];

    if (quantity <= 1) {
      const updatedCartItem = prevItemsInCart.filter(
        (item) => !(item.id === id && item.size === size)
      );
      setCart({
        cartItems: updatedCartItem,
        totalQuantity: updatedTotalQty,
      });
    } else {
      const updatedCartItem = prevItemsInCart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart({
        cartItems: updatedCartItem,
        totalQuantity: updatedTotalQty,
      });
    }
    localStorage.setItem(
      "cart",
      JSON.stringify({
        cartItems: updatedCartItem,
        totalQuantity: updatedTotalQty,
      })
    );
  };

  useEffect(() => {
    const fetchedCart = localStorage.getItem("cart");
    if (fetchedCart) {
      setCart(JSON.parse(fetchedCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseItemQuantity, decreaseItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
