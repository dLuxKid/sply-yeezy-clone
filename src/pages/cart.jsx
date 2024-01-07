import { Link } from "react-router-dom";
import { useCartContext } from "../context/useCartContext";
import ArrowIcon from "../assets/arrow-icon";

export default function Cart() {
  const { cart, increaseItemQuantity, decreaseItemQuantity } = useCartContext();

  return (
    <main className="w-full min-h-screen relative bg-[rgba(241,240,234)]">
      <div className="fixed left-[2rem] z-[100] bottom-[2rem] flex flex-col gap-3 items-start justify-center">
        <p>
          {!!cart.totalQuantity && <span>SPLY BAG ({cart.totalQuantity})</span>}
        </p>
        {!cart.totalQuantity && (
          <Link to={"/"}>
            <p className="mb-2">YOUR CART IS EMPTY</p>
          </Link>
        )}
        {!cart.totalQuantity && (
          <Link to={"/"}>
            <p className="mb-2">CONTINUE SHOPPING</p>
          </Link>
        )}
        {!!cart.totalQuantity &&
          cart.cartItems.map((item, idx) => (
            <div className="flex gap-3 items-start justify-center" key={idx}>
              <button
                type="button"
                title="reduce quantity"
                onClick={() => decreaseItemQuantity(item)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                title="increase quantity"
                onClick={() => increaseItemQuantity(item)}
              >
                +
              </button>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.size}</p>
            </div>
          ))}
        <Link to={"/checkout"}>
          <button
            disabled={Boolean(!cart.totalQuantity)}
            type="button"
            className="group"
          >
            DELIVERY ROOM
            <span className="group-disabled:fill-[#a3a3a3] fill-black">
              <ArrowIcon />
            </span>
          </button>
        </Link>
      </div>
    </main>
  );
}
