import heroImage from "../assets/hero.png";
import classicMilkTea from "../assets/classic-milk-tea.png";
import strawberryCroissant from "../assets/strawberry-croissant.png";
import mochiBox from "../assets/mochi-box.png";
import DailyDrink from "../components/DailyDrink";
import Location from "../components/Location";

const Home = () => {
  return (
    <>
      <div className="mx-auto mt-22.5 min-h-screen w-full max-w-375">
        <main>
          <section className="flex min-h-125 items-center justify-between bg-[#ffeef5] px-[10%] py-18">
            <div className="max-w-150">
              <p className="text-sm font-semibold tracking-[2px] text-[#d982a8]">
                WELCOME TO
              </p>

              <h2 className="my-2.5 mb-5 text-6xl font-semibold text-[#d982a8]">
                Mochi & Milk
              </h2>

              <p className="mb-7.5 text-[19px] font-normal leading-relaxed">
                Your cute little boba café for delicious drinks, sweet treats
                and cozy moments. ♡
              </p>

              <a
                href="/menu"
                className="inline-block rounded-full bg-[#d982a8] px-6 py-3 font-semibold text-white transition hover:bg-[#d96891]"
              >
                VIEW OUR MENU
              </a>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex w-100 items-center justify-center">
                <img
                  src={heroImage}
                  alt="Boba milk tea"
                  className="h-full w-full object-contain drop-shadow-[0_10px_15px_rgba(100,70,80,0.2)] animate-[heroEnter_0.7s_cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
            </div>
          </section>

          {/* Daily drink */}
          <DailyDrink />

          {/* Categories */}
          <section className="bg-[#eaf7f1] px-[10%] py-18 text-center">
            <h2 className="mb-9 text-4xl font-semibold text-[#574752]">
              Something for Everyone ♡
            </h2>

            <div className="mx-auto grid max-w-250 grid-cols-3 gap-6">
              <div className="rounded-[22px] border-2 border-[#d6ece2] bg-white px-5 py-7.5">
                <div className="mb-4 flex h-30 items-center justify-center">
                  <img
                    src={classicMilkTea}
                    alt="Classic Milk Tea"
                    className="h-full object-contain"
                  />
                </div>

                <h3 className="mb-2.5 text-xl font-semibold text-[#574752]">
                  Boba Drinks
                </h3>

                <p className="font-normal leading-relaxed">
                  Milk teas, fruit teas and refreshing drinks.
                </p>
              </div>

              <div className="rounded-[22px] border-2 border-[#d6ece2] bg-white px-5 py-7.5">
                <div className="mb-4 flex h-30 items-center justify-center">
                  <img
                    src={strawberryCroissant}
                    alt="Strawberry Croissant"
                    className="h-full object-contain"
                  />
                </div>

                <h3 className="mb-2.5 text-xl font-semibold text-[#574752]">
                  Pastries
                </h3>

                <p className="font-normal leading-relaxed">
                  Fresh and fluffy treats baked with love.
                </p>
              </div>

              <div className="rounded-[22px] border-2 border-[#d6ece2] bg-white px-5 py-7.5">
                <div className="mb-4 flex h-30 items-center justify-center">
                  <img
                    src={mochiBox}
                    alt="Mochi Box"
                    className="h-full object-contain"
                  />
                </div>

                <h3 className="mb-2.5 text-xl font-semibold text-[#574752]">
                  Sweet Treats
                </h3>

                <p className="font-normal leading-relaxed">
                  Cakes, mochi and other little delights.
                </p>
              </div>
            </div>
          </section>

          {/* Location */}
          <Location />
        </main>
      </div>
    </>
  );
};

export default Home;
