import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#f3dce6] p-5 text-center text-[#574752]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold">MOCHI & MILK 🧋</h2>
          <p>Your little boba corner ♡</p>
        </div>

        <div className="flex gap-10">
          <Link to="/">HOME</Link>
          <Link to="/menu">MENU</Link>
          <Link to="/#locations">LOCATIONS</Link>
          <Link to="/profile">PROFILE</Link>
        </div>

        <div>
          <p>Follow us ♡</p>

          <div className="mt-2 flex justify-center gap-4">
            <a href="https://www.instagram.com/" aria-label="Instagram">
              📷
            </a>
            <a href="https://www.tiktok.com/" aria-label="TikTok">
              🎵
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook">
              💌
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-[#d9bfc9] pt-4">
        <p>Made with ♡ and boba · © 2026 Mochi & Milk</p>
      </div>
    </footer>
  );
};

export default Footer;
