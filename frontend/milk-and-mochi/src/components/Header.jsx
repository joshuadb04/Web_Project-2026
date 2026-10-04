import { UserContext } from "../contexts/UserContext.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import { useContext } from "react";
import { Link } from "react-router";
import cartImage from "../assets/cart.png";

const Header = () => {
  const { user, handleLogout } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header className="fixed top-0 left-1/2 z-50 flex h-22.5 w-full max-w-375 -translate-x-1/2 items-center justify-between border-b-2 border-[#f3dce6] bg-white">
      <a href="/">
        <h1 className="cursor-pointer pl-6 pt-2 text-3xl font-bold text-[#607fa3] transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 hover:text-[#d982a8]">
          MOCHI & MILK🧋
        </h1>
      </a>

      <nav className="flex justify-end bg-white">
        <div className="flex gap-15 pr-25 text-xl font-semibold">
          <a className="transition hover:text-[#66506f]" href="/menu">
            MENU
          </a>

          <Link className="transition hover:text-[#66506f]" to="/#locations">
            LOCATIONS
          </Link>

          <Link className="transition hover:text-[#66506f]" to="/#daily-drink">
            DAILY
          </Link>
        </div>

        <div className="flex gap-10 pr-12 text-xl font-semibold">
          {user && (
            <Link className="transition hover:text-[#66506f]" to="/profile">
              PROFILE
            </Link>
          )}

          {user ? (
            <>
              <button
                type="button"
                onClick={handleLogout}
                className="transition hover:text-[#66506f]"
              >
                LOGOUT
              </button>
              <Link
                className="flex items-center gap-2 transition hover:text-[#66506f]"
                to="/cart"
              >
                <img src={cartImage} alt="Cart" className="size-6" />
                CART
                <span>{cartCount}</span>
              </Link>
            </>
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
