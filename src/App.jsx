import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import products from "./assets/data/products";

function App() {
  const [currentProductId, setCurrentProductId] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");

      sections.forEach((section) => {
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

  return (
    <main className="w-full min-h-screen relative bg-[rgba(241,240,234)] scroll-smooth">
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
        <p className="text-sm font-normal text-black">SPLY</p>
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
              <ul className="flex flex-col gap-2 text-sm font-normal text-black duration-300 transform-cpu transition-all ease-out">
                <li>1: UNDER US 6 / EU 39</li>
                <li>2: US 7 - US 9.5 / EU 40 - 43</li>
                <li>3: US 10 - US 13 / EU 44 - 47</li>
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

export default App;
