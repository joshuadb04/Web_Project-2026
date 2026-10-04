import { useLocation } from "react-router";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import brownSugarMilkTea from "../assets/brown-sugar-milk-tea.png";
import creamCheeseMilkTea from "../assets/cream-cheese-milk-tea.png";
import passionFruitTea from "../assets/passion-fruit-tea.png";
import classicMilkTea from "../assets/classic-milk-tea.png";
import strawberryMilkTea from "../assets/strawberry-milk-tea.png";
import matchaLatte from "../assets/matcha-latte.png";
import mangoFruitTea from "../assets/mango-fruit-tea.png";
import { useNavigate } from "react-router";

const Single = () => {
  const { addToCart } = useContext(CartContext);
  const { state } = useLocation();
  const item = state.item;
  const navigate = useNavigate();

  const menuImages = {
    "Brown Sugar Milk Tea": brownSugarMilkTea,
    "Cream Cheese Milk Tea": creamCheeseMilkTea,
    "Passion Fruit Tea": passionFruitTea,
    "Classic Milk Tea": classicMilkTea,
    "Strawberry Milk Tea": strawberryMilkTea,
    "Matcha Latte": matchaLatte,
    "Mango Fruit Tea": mangoFruitTea,
  };

  return (
    <main className="mx-auto mt-22.5 max-w-375 px-[10%] py-18">
      <div className="mx-auto flex max-w-250 gap-12 rounded-3xl border-2 border-[#f3dce6] bg-white p-10 shadow-[0_8px_25px_rgba(100,70,80,0.08)]">
        <div className="flex size-100 shrink-0 items-center justify-center rounded-3xl bg-[#ffe0eb]">
          <img
            className="size-80 object-contain"
            src={menuImages[item.name]}
            alt={item.name}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm font-semibold tracking-[2px] text-[#d982a8]">
            MOCHI & MILK
          </p>

          <h1 className="mb-4 text-4xl font-semibold text-[#574752]">
            {item.name}
          </h1>

          <p className="mb-5 leading-relaxed text-[#574752]">
            {item.description}
          </p>

          <p className="mb-3 text-2xl font-semibold text-[#83a997]">
            {item.price} €
          </p>

          <p className="mb-7 text-sm text-[#574752]">
            Dietary Info: {item.dietary}
          </p>

          <button
            type="button"
            onClick={() => {
              addToCart(item);
              navigate("/menu");
            }}
            className="w-fit cursor-pointer rounded-full bg-[#d982a8] px-6 py-3 font-semibold text-white transition hover:bg-[#b96891]"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
};

export default Single;
