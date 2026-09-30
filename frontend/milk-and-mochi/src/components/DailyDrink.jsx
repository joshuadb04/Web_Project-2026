import { useEffect, useState } from "react";
import { useMenu } from "../hooks/apiHooks.js";

const DailyDrink = () => {
  const [dailyDrink, setDailyDrink] = useState(null);
  const { getMenu } = useMenu();

  useEffect(() => {
    const fetchDailyDrink = async () => {
      try {
        const result = await getMenu();
        const dailyDrinks = result.filter(
          (item) => item.type === "Daily Beverage",
        );

        const today = new Date().getDay();
        setDailyDrink(dailyDrinks[today]);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDailyDrink();
  }, []);

  return (
    <section
      id="daily-drink"
      className="bg-[#fff8fb] px-[10%] py-18 text-center"
    >
      <p className="text-sm font-semibold tracking-[2px] text-[#d982a8]">
        TODAY'S SPECIAL
      </p>

      <h2 className="my-2.5 mb-7.5 text-4xl font-semibold text-[#574752]">
        Drink of the Day
      </h2>

      {dailyDrink && (
        <div className="mx-auto flex max-w-212.5 items-center gap-9 rounded-3xl border-2 border-[#f3dce6] bg-white p-7.5 text-left shadow-[0_8px_25px_rgba(100,70,80,0.08)]">
          <div className="flex size-57.5 min-w-57.5 items-center justify-center rounded-2xl bg-[#ffe0eb]">
            {/* Daily drink image will go here */}
          </div>

          <div>
            <h3 className="mb-2.5 text-[28px] font-semibold text-[#d982a8]">
              {dailyDrink.name}
            </h3>

            <p className="mb-4 font-normal leading-relaxed">
              {dailyDrink.description}
            </p>

            <p className="mb-4 text-2xl font-semibold text-[#83a997]">
              {dailyDrink.price}€
            </p>

            <button className="cursor-pointer rounded-full bg-[#d982a8] px-5.5 py-3 font-semibold text-white transition hover:bg-[#b96891]">
              ADD TO ORDER
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DailyDrink;
