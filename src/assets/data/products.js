import pods from "../Pod_update.webp";
import trousers from "../trousers.webp";
import longShirt from "../shirt-long.webp";
import tShirt from "../shirt-t.webp";
import shorts from "../shorts.webp";
import Vinyl from "../Vinyl.webp";

const products = [
  {
    id: 0,
    img: pods,
    type: "shoe",
    price: "#193,300.00",
    name: "YZY PODS",
    sizeGuard: [
      "1: UNDER US 6 / EU 39",
      "2: US 7 - US 9.5 / EU 40 - 43",
      "3: US 10 - US 13 / EU 44 - 47",
    ],
  },
  {
    id: 1,
    img: trousers,
    type: "pants",
    price: "#116,000.00",
    name: "VULTURE PANTS",
    sizeGuard: ["1: XS-S", "2: M-L", "3: L-XL"],
  },
  {
    id: 2,
    type: "pants",
    img: longShirt,
    price: "#96,700.00",
    name: "LONG T",
    sizeGuard: ["1: XS-S", "2: M-L", "3: L-XL"],
  },
  {
    id: 3,
    type: "pants",
    img: shorts,
    price: "#96,700.00",
    name: "VULTURE SHORTS",
    sizeGuard: ["1: XS-S", "2: M-L", "3: L-XL"],
  },
  {
    id: 4,
    type: "pants",
    img: tShirt,
    price: "#77,300.00",
    name: "BOX T",
    sizeGuard: ["1: XS-S", "2: M-L", "3: L-XL"],
  },
  { id: 5, img: Vinyl, type: "music" },
];

export default products;
