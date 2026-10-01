import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <main className="mx-auto mt-22.5 max-w-375 px-[10%] py-18">
      <h2 className="mb-2 text-center text-4xl font-semibold text-[#574752]">
        My Profile
      </h2>
      <p className="mb-5 min-h-5 text-center text-[#574752]"></p>
      <div className="mx-auto flex max-w-187.5 items-center gap-12 rounded-3xl border-2 border-[#f3dce6] bg-white p-7.5 shadow-[0_8px_25px_rgba(100,70,80,0.08)]">
        <div className="flex flex-1 flex-col">
          <label className="mt-3.75 mb-1.25">First name</label>
          <p className="rounded border border-[#999999] bg-[#eeeeee] p-2.5 text-base">
            {user ? user.first_name : ""}
          </p>

          <label className="mt-3.75 mb-1.25">Last name</label>
          <p className="rounded border border-[#999999] bg-[#eeeeee] p-2.5 text-base">
            {user ? user.last_name : ""}
          </p>

          <label className="mt-3.75 mb-1.25">Email</label>
          <p className="rounded border border-[#999999] bg-[#eeeeee] p-2.5 text-base">
            {user ? user.email : ""}
          </p>

          <label className="mt-3.75 mb-1.25">Birthdate</label>
          <p className="rounded border border-[#999999] bg-[#eeeeee] p-2.5 text-base">
            {user ? user.birthdate : ""}
          </p>

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="mt-3 w-fit rounded-full bg-[#83a997] px-3 py-1 text-sm font-semibold text-white hover:bg-[#628b78] cursor-pointer"
            >
              Admin
            </button>
          )}

          <div className="mt-5 flex gap-2.5">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-[#dddddd] px-5 py-2.5 text-black transition hover:bg-[#cccccc]"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="flex size-45 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#607fa3] text-6xl text-white">
          {user?.filename ? (
            <img
              src={user.filename}
              alt="Profile"
              className="size-full object-cover"
            />
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
