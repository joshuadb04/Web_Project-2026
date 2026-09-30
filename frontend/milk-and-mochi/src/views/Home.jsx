import heroImage from "../assets/hero.png";
import DailyDrink from "../components/DailyDrink";

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
                  className="h-full w-full object-contain"
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
                <div className="mb-4 text-5xl">🧋</div>
                <h3 className="mb-2.5 text-xl font-semibold text-[#574752]">
                  Boba Drinks
                </h3>
                <p className="font-normal leading-relaxed">
                  Milk teas, fruit teas and refreshing drinks.
                </p>
              </div>

              <div className="rounded-[22px] border-2 border-[#d6ece2] bg-white px-5 py-7.5">
                <div className="mb-4 text-5xl">🥐</div>
                <h3 className="mb-2.5 text-xl font-semibold text-[#574752]">
                  Pastries
                </h3>
                <p className="font-normal leading-relaxed">
                  Fresh and fluffy treats baked with love.
                </p>
              </div>

              <div className="rounded-[22px] border-2 border-[#d6ece2] bg-white px-5 py-7.5">
                <div className="mb-4 text-5xl">🍰</div>
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
          <section
            id="locations"
            className="bg-[#fff8fb] px-[10%] py-18 text-center"
          >
            <p className="text-sm font-semibold tracking-[2px] text-[#d982a8]">
              FIND US
            </p>

            <h2 className="my-2.5 mb-4 text-4xl font-semibold text-[#574752]">
              Your Nearest Boba ♡
            </h2>

            <p className="mb-7.5 font-normal">
              Looking for a little boba break? Here's our nearest café.
            </p>

            <div className="mx-auto flex max-w-250 overflow-hidden rounded-3xl border-2 border-[#f3dce6] bg-white text-left shadow-[0_8px_25px_rgba(100,70,80,0.08)]">
              <div className="relative h-87.5 w-[65%] overflow-hidden bg-[#dff1e8]">
                <div className="absolute top-25 -left-7.5 h-11.25 w-[120%] rotate-[-20deg] border-2 border-[#e8dfe4] bg-white" />

                <div className="absolute top-55 -left-7.5 h-8.75 w-[120%] rotate-20 border-2 border-[#e8dfe4] bg-white" />

                <div className="absolute -top-5 left-42.5 h-[120%] w-10 rotate-15 border-2 border-[#e8dfe4] bg-white" />

                <div className="absolute top-31.25 left-1/2 z-10 text-5xl">
                  📍
                </div>

                <div className="absolute bottom-6 left-6 rounded-xl bg-white px-4.5 py-3 text-left shadow-[0_5px_15px_rgba(100,70,80,0.1)]">
                  <strong className="font-semibold">Mochi & Milk</strong>
                  <br />
                  123 Boba Street
                </div>
              </div>

              <div className="flex-1 px-7.5 py-11.25">
                <h3 className="mb-5 text-[25px] font-semibold text-[#d982a8]">
                  Nearest Café
                </h3>

                <p className="mb-4 font-normal leading-relaxed">
                  <strong className="font-semibold">
                    Mochi & Milk - City Center
                  </strong>
                </p>

                <p className="mb-4 font-normal leading-relaxed">
                  123 Boba Street
                  <br />
                  Helsinki
                </p>

                <p className="mb-4 font-normal leading-relaxed">♡ 5 min walk</p>

                <button className="cursor-pointer rounded-full bg-[#d982a8] px-5.5 py-3 font-semibold text-white transition hover:bg-[#b96891]">
                  VIEW LOCATION
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
