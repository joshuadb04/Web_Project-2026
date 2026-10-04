import { useEffect, useRef, useState } from "react";
import { useMenu } from "../hooks/apiHooks.js";
import brownSugarMilkTea from "../assets/brown-sugar-milk-tea.png";
import creamCheeseMilkTea from "../assets/cream-cheese-milk-tea.png";
import passionFruitTea from "../assets/passion-fruit-tea.png";
//import matchaMochi from "../assets/matcha-mochi.png";
import classicMilkTea from "../assets/classic-milk-tea.png";
import strawberryMilkTea from "../assets/strawberry-milk-tea.png";
import matchaLatte from "../assets/matcha-latte.png";
import mangoFruitTea from "../assets/mango-fruit-tea.png";
import strawberryCroissant from "../assets/strawberry-croissant.png";
import brownSugarCookie from "../assets/brown-sugar-cookie.png";
import vanillaCupcake from "../assets/vanilla-cupcake.png";
import matchaMacarons from "../assets/matcha-macarons.png";
import strawberryCake from "../assets/strawberry-cake.png";
import mochiBox from "../assets/mochi-box.png";
import chocolateBrownie from "../assets/chocolate-brownie.png";
import chocolateMatchaDonut from "../assets/chocolate-matcha-donut.png";
import strawberryCreamMochi from "../assets/strawberry-cream-mochi.png";
import mangoMochi from "../assets/mango-mochi.png";
import taroMilkTea from "../assets/taro-milk-tea.png";
//import strawberryMatchaLatte from "../assets/strawberry-matcha-latte.png";
//import peachFruitTea from "../assets/peach-fruit-tea.png";
//import passionFruitMangoTea from "../assets/passion-fruit-mango-tea.png";
//import mintChocolateMilkTea from "../assets/mint-chocolate-milk-tea.png";
//import chocolateMilkTea from "../assets/chocolate-milk-tea.png";
//import raspberryFruitTea from "../assets/raspberry-fruit-tea.png";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

const Menu = () => {
  const menuImages = {
    "Brown Sugar Milk Tea": brownSugarMilkTea,
    "Cream Cheese Milk Tea": creamCheeseMilkTea,
    "Passion Fruit Tea": passionFruitTea,
    //"Matcha Mochi": matchaMochi,
    "Classic Milk Tea": classicMilkTea,
    "Strawberry Milk Tea": strawberryMilkTea,
    "Matcha Latte": matchaLatte,
    "Mango Fruit Tea": mangoFruitTea,
    "Strawberry Croissant": strawberryCroissant,
    "Brown Sugar Cookie": brownSugarCookie,
    "Vanilla Cupcake": vanillaCupcake,
    "Matcha Macarons": matchaMacarons,
    "Strawberry Cake": strawberryCake,
    "Mochi Box": mochiBox,
    "Chocolate Brownie": chocolateBrownie,
    "Chocolate Matcha Donut": chocolateMatchaDonut,
    "Strawberry Cream Mochi": strawberryCreamMochi,
    "Mango Mochi": mangoMochi,
    "Taro Milk Tea": taroMilkTea,
    //"Strawberry Matcha Latte": strawberryMatchaLatte,
    //"Peach Fruit Tea": peachFruitTea,
    //"Passion Fruit Mango Tea": passionFruitMangoTea,
    //"Mint Chocolate Milk Tea": mintChocolateMilkTea,
    //"Chocolate Milk Tea": chocolateMilkTea,
    //"Raspberry Fruit Tea": raspberryFruitTea,
  };
  const beveragesRef = useRef(null);
  const pastriesRef = useRef(null);
  const sweetTreatsRef = useRef(null);
  const [menu, setMenu] = useState([]);
  const { getMenu } = useMenu();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const result = await getMenu();
        setMenu(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMenu();
  }, []);

  return (
    <main>
      <section className="mx-auto mt-22.5 max-w-375 bg-[#ffeef5] px-5 pb-11.25 pt-10 text-center">
        <h2 className="my-2.5 text-[50px] text-[#d982a8]">Our Menu ♡</h2>
        <p>Pick your favourite drink, pastry or sweet treat!</p>
      </section>

      {/* Beverages */}
      <section className="px-[10%] pb-5 pt-13.75">
        <h2 className="mb-8 text-[30px] text-[#83a997]">Beverages</h2>
        <div className="flex">
          <button
            type="button"
            onClick={() =>
              beveragesRef.current.scrollBy({ left: -500, behavior: "smooth" })
            }
            className="size-8 shrink-0 self-center"
          >
            <img
              className="size-8 object-contain"
              src={leftArrow}
              alt="Scroll left"
            />
          </button>

          <div
            ref={beveragesRef}
            className="grid grid-flow-col grid-cols-[repeat(4,500px)] gap-5 overflow-x-auto pt-2"
          >
            {menu
              .filter(
                (item) =>
                  item.type === "Milk Tea" ||
                  item.type === "Fruit Tea" ||
                  item.type === "Hot Beverage",
              )
              .map((item) => (
                <div
                  key={item.item_id}
                  className="relative z-10 flex min-h-40 w-125 shrink-0 gap-4 rounded-[20px] border-2 border-[#f3dce6] bg-white p-5.5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(100,70,80,0.08)]"
                >
                  <div
                    onClick={() =>
                      navigate("/single", { state: { item: item } })
                    }
                    className="flex flex-1 cursor-pointer gap-4"
                  >
                    <img
                      className="h-28 w-28 object-contain"
                      src={menuImages[item.name]}
                      alt={item.name}
                    />

                    <div>
                      <h3 className="mb-2 text-[19px]">{item.name}</h3>

                      <p className="mb-2.5 text-sm leading-normal">
                        {item.description}
                      </p>

                      <span className="text-[17px] font-semibold text-[#d982a8]">
                        {item.price} €
                      </span>
                    </div>
                  </div>

                  {user && user.role === "admin" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/edit", { state: { item: item } })
                      }
                      className="mt-3 h-fit rounded-full bg-[#83a997] px-4 py-2 text-sm font-semibold text-white hover:bg-[#628b78] cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
          </div>

          <button
            type="button"
            onClick={() =>
              beveragesRef.current.scrollBy({ left: 500, behavior: "smooth" })
            }
            className="size-8 shrink-0 self-center"
          >
            <img
              className="size-8 object-contain"
              src={rightArrow}
              alt="Scroll right"
            />
          </button>
        </div>
      </section>

      {/* Pastries */}
      <section className="px-[10%] pb-5 pt-13.75">
        <h2 className="mb-7 text-[30px] text-[#83a997]">Pastries</h2>

        <div className="flex">
          <button
            type="button"
            onClick={() =>
              pastriesRef.current.scrollBy({ left: -500, behavior: "smooth" })
            }
            className="size-8 shrink-0 self-center"
          >
            <img
              className="size-8 object-contain"
              src={leftArrow}
              alt="Scroll left"
            />
          </button>

          <div
            ref={pastriesRef}
            className="grid grid-flow-col grid-cols-[repeat(4,500px)] gap-5 overflow-x-auto pt-2"
          >
            {menu
              .filter((item) => item.type === "Pastry")
              .map((item) => (
                <div
                  key={item.item_id}
                  className="relative z-10 flex min-h-40 w-125 shrink-0 gap-4 rounded-[20px] border-2 border-[#f3dce6] bg-white p-5.5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(100,70,80,0.08)]"
                >
                  <div
                    onClick={() =>
                      navigate("/single", { state: { item: item } })
                    }
                    className="flex flex-1 cursor-pointer gap-4"
                  >
                    <div className="flex h-32 w-32 shrink-0 items-center justify-center">
                      <img
                        className="max-h-full max-w-full object-contain"
                        src={menuImages[item.name]}
                        alt={item.name}
                      />
                    </div>

                    <div>
                      <h3 className="mb-2 text-[19px]">{item.name}</h3>

                      <p className="mb-2.5 text-sm leading-normal">
                        {item.description}
                      </p>

                      <span className="text-[17px] font-semibold text-[#d982a8]">
                        {item.price} €
                      </span>
                    </div>
                  </div>

                  {user && user.role === "admin" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/edit", { state: { item: item } })
                      }
                      className="mt-3 h-fit rounded-full bg-[#83a997] px-4 py-2 text-sm font-semibold text-white hover:bg-[#628b78] cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
          </div>

          <button
            type="button"
            onClick={() =>
              pastriesRef.current.scrollBy({ left: 500, behavior: "smooth" })
            }
            className="size-8 shrink-0 self-center"
          >
            <img
              className="size-8 object-contain"
              src={rightArrow}
              alt="Scroll right"
            />
          </button>
        </div>
      </section>

      {/* Sweet Treats */}
      <section className="px-[10%] pb-5 pt-13.75">
        <h2 className="mb-7 text-[30px] text-[#83a997]">Sweet Treats</h2>
        <div className="flex">
          <button
            type="button"
            onClick={() =>
              sweetTreatsRef.current.scrollBy({
                left: -500,
                behavior: "smooth",
              })
            }
            className="size-8 shrink-0 self-center"
          >
            <img
              className="size-8 object-contain"
              src={leftArrow}
              alt="Scroll left"
            />
          </button>

          <div
            ref={sweetTreatsRef}
            className="grid grid-flow-col grid-cols-[repeat(4,500px)] gap-5 overflow-x-auto pt-2"
          >
            {menu
              .filter((item) => item.type === "Sweet Treat")
              .map((item) => (
                <div
                  key={item.item_id}
                  className="relative z-10 flex min-h-40 w-125 shrink-0 gap-4 rounded-[20px] border-2 border-[#f3dce6] bg-white p-5.5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(100,70,80,0.08)]"
                >
                  <div
                    onClick={() =>
                      navigate("/single", { state: { item: item } })
                    }
                    className="flex flex-1 cursor-pointer gap-4"
                  >
                    <div className="flex h-32 w-32 shrink-0 items-center justify-center">
                      <img
                        className="max-h-full max-w-full object-contain"
                        src={menuImages[item.name]}
                        alt={item.name}
                      />
                    </div>

                    <div>
                      <h3 className="mb-2 text-[19px]">{item.name}</h3>

                      <p className="mb-2.5 text-sm leading-normal">
                        {item.description}
                      </p>

                      <span className="text-[17px] font-semibold text-[#d982a8]">
                        {item.price} €
                      </span>
                    </div>
                  </div>

                  {user && user.role === "admin" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/edit", { state: { item: item } })
                      }
                      className="mt-3 h-fit rounded-full bg-[#83a997] px-4 py-2 text-sm font-semibold text-white hover:bg-[#628b78] cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
          </div>

          <button
            type="button"
            onClick={() =>
              sweetTreatsRef.current.scrollBy({ left: 500, behavior: "smooth" })
            }
            className="size-8 shrink-0 self-center"
          >
            <img
              className="size-8 object-contain"
              src={rightArrow}
              alt="Scroll right"
            />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Menu;
