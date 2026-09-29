import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

const Header = () => {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <header className="fixed top-0 left-1/2 z-50 flex h-22.5 w-full max-w-375 -translate-x-1/2 items-center justify-between border-b-2 border-[#f3dce6] bg-white">
      <a href="/">
        <h1 className="pl-6 pt-2 text-3xl font-bold text-[#607fa3]">
          MOCHI & MILK🧋
        </h1>
      </a>

      <nav className="flex justify-end bg-white">
        <div className="flex gap-15 pr-25 text-xl font-semibold">
          <a className="transition hover:text-[#66506f]" href="/menu">
            MENU
          </a>

          <a className="transition hover:text-[#66506f]" href="#locations">
            LOCATIONS
          </a>

          <a className="transition hover:text-[#66506f]" href="#daily-drink">
            D.O.T.D.
          </a>
        </div>

        <div className="flex gap-10 pr-12 text-xl font-semibold">
          <a className="transition hover:text-[#66506f]" href="/profile">
            PROFILE
          </a>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="transition hover:text-[#66506f]"
            >
              LOGOUT
            </button>
          ) : (
            <a
              className="transition hover:text-[#66506f]"
              href="/login-register"
            >
              LOGIN
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
