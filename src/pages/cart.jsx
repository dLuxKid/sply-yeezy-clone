import { Link } from "react-router-dom";
import { useCartContext } from "../context/useCartContext";

export default function Cart() {
  const { cart } = useCartContext();

  return (
    <main className="w-full min-h-screen relative bg-[rgba(241,240,234)]">
      <div className="fixed left-[2.5rem] z-[100] bottom-[2.5rem] flex flex-col gap-3 items-start justify-center">
        <p className="text-sm font-normal text-black">
          {!!cart.totalQuantity && <span>SPLY BAG ({cart.totalQuantity})</span>}
        </p>
        {!cart.totalQuantity && (
          <Link to={"/"}>
            <p className="text-sm font-normal text-black mb-2">
              YOUR CART IS EMPTY
            </p>
          </Link>
        )}
        {!cart.totalQuantity && (
          <Link to={"/"}>
            <p className="text-sm font-normal text-black mb-2">
              CONTINUE SHOPPING
            </p>
          </Link>
        )}
        <button
          disabled={Boolean(!cart.totalQuantity)}
          type="button"
          className="bg-transparent outline-0 border-0 text-sm font-normal text-black flex items-center cursor-pointer disabled:cursor-not-allowed group disabled:text-[#a3a3a3]"
        >
          DELIVERY ROOM
          <span
            className="group-disabled:fill-[#a3a3a3] fill-blac    
          "
          >
            <svg
              style={{ width: "25px", height: "10px" }}
              id="Layer_2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16.81 17.4"
            >
              <defs>
                <style>{`.cls-1{stroke-width:0px;}`}</style>
              </defs>
              <polygon
                className="cls-1"
                points="7.43 .11 6 1.65 12.45 7.65 .15 7.65 .15 9.75 12.46 9.75 6 15.75 7.43 17.29 16.67 8.7 7.43 .11"
              />
            </svg>
          </span>
        </button>
      </div>
    </main>
  );
}
