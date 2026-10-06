import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#f3dce6] p-5 text-center text-[#574752]">
      <div>
        <div>
          <h2 className="text-[#574752]">MOCHI & MILK 🧋</h2>
          <p>Your little boba corner ♡</p>
        </div>

        <div className="mt-4 flex justify-center gap-6">
          <Link
            to="/"
            className="text-black transition duration-300 hover:text-[#66506f]"
          >
            HOME
          </Link>
          <Link
            to="/menu"
            className="text-black transition duration-300 hover:text-[#66506f]"
          >
            MENU
          </Link>
          <Link
            to="/#locations"
            className="text-black transition duration-300 hover:text-[#66506f]"
          >
            LOCATIONS
          </Link>
          <Link
            to="/profile"
            className="text-black transition duration-300 hover:text-[#66506f]"
          >
            PROFILE
          </Link>
        </div>

        <div className="mt-4">
          <p>Follow us ♡</p>

          <div className="mt-2 flex justify-center gap-4">
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              className="text-black transition duration-300 hover:text-[#66506f]"
            >
              📷
            </a>
            <a
              href="https://www.tiktok.com/"
              aria-label="TikTok"
              className="text-black transition duration-300 hover:text-[#66506f]"
            >
              🎵
            </a>
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              className="text-black transition duration-300 hover:text-[#66506f]"
            >
              💌
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p>Made with ♡ and boba · © 2026 Mochi & Milk</p>
      </div>
    </footer>
  );
};

export default Footer;
