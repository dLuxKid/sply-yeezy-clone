import { useEffect } from "react";
import { useState } from "react";
import products from "../assets/data/products";
import { useCartContext } from "../context/useCartContext";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [currentProductId, setCurrentProductId] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState(1);

  const { cart } = useCartContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");

      sections.forEach((section, i) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setCurrentProductId(Number(section.id));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let sections = gsap.utils.toArray(".section"),
      snapTriggers = sections.map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
        })
      ),
      snaps = [];

    ScrollTrigger.create({
      trigger: ".main",
      start: "top top",
      end: () =>
        "+=" +
        (sections[sections.length - 1].getBoundingClientRect().top -
          sections[0].getBoundingClientRect().top),
      onRefresh: (self) => {
        let distance = self.end - self.start;
        snapTriggers.forEach(
          (trigger, i) => (snaps[i] = (trigger.start - self.start) / distance)
        );
      },
      snap: snaps,
    });
  }, []);

  return (
    <main className="w-full min-h-screen relative bg-[rgba(241,240,234)] scroll-smooth main">
      {products.map((items, i) => (
        <div
          className="w-full h-screen flex items-center justify-center section"
          key={i}
          id={i}
        >
          <img
            src={items.img}
            alt={items.name}
            className="object-fill object-center max-w-sm"
          />
        </div>
      ))}
      <div className="fixed left-[4.5rem] z-[100] bottom-[4.5rem] flex flex-col gap-3 items-start justify-center">
        <Link to={"/cart"}>
          <p className="text-sm font-normal text-black">
            SPLY{" "}
            {!!cart.totalQuantity && <span>BAG ({cart.totalQuantity})</span>}
          </p>
        </Link>
        {products[currentProductId].price && (
          <>
            <p className="flex gap-2 font-sm font-normal text-black">
              <span>{products[currentProductId].name}</span>
              <span>{products[currentProductId].price}</span>
            </p>
            <p className="text-sm font-normal text-black">
              DELIVERY WITHIN 4 WEEKS
            </p>
            {showSizeGuide && (
              <ul
                className={`flex ${
                  products[currentProductId].type === "shoe"
                    ? "flex-col"
                    : "flex-row"
                } gap-2 text-sm font-normal text-black duration-300 transform-cpu transition-all ease-out`}
              >
                {products[currentProductId].sizeGuard.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            <p className="text-sm font-normal text-black flex gap-2.5">
              <span>SIZE</span>
              <span
                onClick={() => setSelectedSize(1)}
                className={
                  selectedSize === 1
                    ? "text-black cursor-pointer"
                    : "text-[#a3a3a3] cursor-pointer"
                }
              >
                1
              </span>
              <span
                onClick={() => setSelectedSize(2)}
                className={
                  selectedSize === 2
                    ? "text-black cursor-pointer"
                    : "text-[#a3a3a3] cursor-pointer"
                }
              >
                2
              </span>
              <span
                onClick={() => setSelectedSize(3)}
                className={
                  selectedSize === 3
                    ? "text-black cursor-pointer"
                    : "text-[#a3a3a3] cursor-pointer"
                }
              >
                3
              </span>
              <span
                className="text-[#a3a3a3] cursor-pointer"
                onClick={() => setShowSizeGuide((prev) => !prev)}
              >
                SIZE GUIDE
              </span>
            </p>
            <button
              type="button"
              className="bg-transparent outline-0 border-0 text-sm font-normal text-black flex items-center"
            >
              ORDER
              <span>
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
          </>
        )}
        {!products[currentProductId].price && (
          <button
            type="button"
            className="bg-transparent outline-0 border-0 text-sm font-normal text-black flex items-center"
          >
            VULTURES
            <span>
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
        )}
      </div>
    </main>
  );
}
