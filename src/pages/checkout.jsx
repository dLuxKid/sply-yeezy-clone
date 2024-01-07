import { Link, redirect } from "react-router-dom";
import LessThanIcon from "../assets/less-than";
import { useCartContext } from "../context/useCartContext";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart } = useCartContext();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = cart.cartItems.reduce((accumulator, item) => {
      const price =
        parseFloat(item.price.slice(1).replace(/,/g, "")) * item.quantity;
      const sum = accumulator + price;
      return sum;
    }, 0);
    setTotalPrice(totalPrice);
  }, []);

  return (
    <main className="w-full relative min-h-screen p-[5%] pt-[7.5%]">
      <span className="cursor-pointer fill-[#a3a3a3] hover:fill-[#1773b0] duration-200 transition-all ease-in-out">
        <Link to={-1}>
          <LessThanIcon />
        </Link>
      </span>
      <p className="mt-4 mb-8 text-center w-full md:text-start">
        DELIVERY ROOM
      </p>
      <div className="w-full flex items-start gap-16 lg:gap-8 justify-between flex-col lg:flex-row">
        <div className="w-full flex-1 flex justify-between flex-col gap-8 order-1 lg:order-none">
          <form className="flex flex-col items-stretch justify-start gap-4 w-full">
            <input
              required
              type="text"
              placeholder="EMAIL OR MOBILE PHONE NUMBER"
            />
            <div className="flex w-full gap-4 flex-wrap flex-col sm:flex-row">
              <input
                required
                type="text"
                placeholder="FIRST NAME"
                className="flex-1"
              />
              <input
                required
                type="text"
                placeholder="LAST NAME"
                className="flex-1"
              />
            </div>
            <input required type="text" placeholder="ADDRESS" />
            <input
              type="text"
              placeholder="APARTMENT, SUITE, ETC. (OPTIONAL)"
            />
            <div className="flex w-full gap-4 flex-wrap flex-col sm:flex-row">
              <input
                required
                type="text"
                placeholder="CITY"
                className="flex-1"
              />
              <input
                required
                type="text"
                placeholder="STATE"
                className="flex-1"
              />
              <input
                required
                type="text"
                placeholder="POSTAL CODE"
                className="flex-1"
              />
            </div>
            <input
              required
              type="text"
              placeholder="PHONE NUMBER"
              className="flex-1"
            />
            <div className="flex gap-4 flex-col sm:flex-row items-center justify-center sm:justify-between my-4">
              <Link to={"/cart"}>
                <div className="flex items-center gap-2">
                  <LessThanIcon />
                  <p>RETURN TO CART</p>
                </div>
              </Link>
              <Link to={"/shipping"}>
                <button
                  disabled={true}
                  type="submit"
                  title="go to shipping"
                  className="text-sm font-normal text-black"
                >
                  CONTINUE TO SHIPPING
                </button>
              </Link>
            </div>
          </form>
          <div className="border-t-[0.5px] border-t-[#a3a3a3] py-2">
            <ul className="flex gap-x-3 flex-wrap">
              <li className="text-sm font-normal text-black">REFUND POLICY</li>
              <li className="text-sm font-normal text-black">PRIVACY POLICY</li>
              <li className="text-sm font-normal text-black">
                TERMS OF SERVICE
              </li>
              <li className="text-sm font-normal text-black">
                CONTACT INFORMATION
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
          <div className="flex flex-col gap-2 w-full">
            {cart.cartItems.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between w-full gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.img}
                      alt="image"
                      className="object-fill object-center w-20 h-20"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.size}</p>
                    </div>
                  </div>
                  <p>{item.price}</p>
                </div>
                <p className="sm:-mt-4">{item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-col w-full">
            <p className="flex gap-4 justify-between items-center flex-wrap">
              <span className="text-[#a3a3a3]">SUBTOTAL</span>
              <span>₦{totalPrice}</span>
            </p>
            <p className="flex gap-4 justify-between items-center flex-wrap">
              <span className="text-[#a3a3a3]">SHIPPING</span>
              <span className="text-[#a3a3a3] text-xs">
                CALCULATED AT NEXT STEP
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="text-[#a3a3a3]">TOTAL</span>
            <p>
              <span className="text-[#a3a3a3] text-xs">NGN</span> ₦{totalPrice}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
