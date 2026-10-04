import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/apiHooks.js";

const Profile = () => {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const { putUser, putPassword, putProfilePicture } = useUser();

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [birthdate, setBirthdate] = useState(user?.birthdate || "");
  const [filename, setFilename] = useState(user?.filename || "");
  const [profileFile, setProfileFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [editing, setEditing] = useState(false);

  return (
    <main className="mx-auto mt-22.5 min-h-screen w-full max-w-375 bg-[#fff8fb] px-5 py-18">
      <h2 className="mt-2 text-center text-4xl font-semibold text-[#d982a8]">
        My Profile
      </h2>
      {/* Acc details */}
      <p className="mt-2 text-center text-[#665d63]">My account details.</p>

      <div className="mx-auto mt-8 flex max-w-5xl items-center gap-12 rounded-3xl border-2 border-[#f3dce6] bg-white p-7.5 shadow-[0_8px_25px_rgba(100,70,80,0.08)] max-md:flex-col-reverse">
        <div className="flex flex-1 flex-col">
          <label className="mt-4 mb-1 font-semibold">First name</label>

          <input
            type="text"
            value={editing ? firstName : user?.first_name || ""}
            disabled={!editing}
            onChange={(event) => setFirstName(event.target.value)}
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <label className="mt-4 mb-1 font-semibold">Last name</label>

          <input
            type="text"
            value={editing ? lastName : user?.last_name || ""}
            disabled={!editing}
            onChange={(event) => setLastName(event.target.value)}
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <label className="mt-4 mb-1 font-semibold">Email</label>

          <input
            type="email"
            value={editing ? email : user?.email || ""}
            disabled={!editing}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <label className="mt-4 mb-1 font-semibold">Birthdate</label>

          <input
            type="date"
            value={editing ? birthdate : user?.birthdate?.slice(0, 10) || ""}
            disabled={!editing}
            onChange={(event) => setBirthdate(event.target.value)}
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <label className="mt-4 mb-1 font-semibold">Current password</label>

          <input
            type="password"
            value={editing ? currentPassword : ""}
            disabled={!editing}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <label className="mt-4 mb-1 font-semibold">New password</label>

          <input
            type="password"
            value={editing ? newPassword : ""}
            disabled={!editing}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <label className="mt-4 mb-1 font-semibold">
            Confirm new password
          </label>

          <input
            type="password"
            value={editing ? confirmPassword : ""}
            disabled={!editing}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            className="rounded-[11px] border border-[#e8dde2] bg-[#f8f3f5] p-2.5 text-[#574752] outline-none disabled:cursor-default"
          />

          <p className="mt-1 text-sm text-red-500">{passwordMessage}</p>

          {/* Toggle for profile pic */}
          {editing && (
            <div>
              <label className="mt-2 block font-semibold">
                Change Profile Picture
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(event) => setProfileFile(event.target.files[0])}
                className="file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#d982a8] file:px-5 file:py-2.5 file:font-semibold file:text-white file:hover:bg-[#d96891]"
              />
            </div>
          )}

          {/* Admin button for admins only */}
          {user?.role === "admin" && (
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="mt-3 w-fit rounded-full bg-[#83a997] px-3 py-1 text-sm font-semibold text-white transition hover:bg-[#628b78]"
            >
              Admin
            </button>
          )}
          {/* Button and editing functionality */}
          <div className="mt-5 flex gap-2.5">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      if (currentPassword || newPassword || confirmPassword) {
                        if (
                          !currentPassword ||
                          !newPassword ||
                          !confirmPassword
                        ) {
                          setPasswordMessage(
                            "Please fill in all password fields",
                          );
                          return;
                        }

                        if (newPassword !== confirmPassword) {
                          setPasswordMessage("New passwords do not match");
                          return;
                        }
                      }

                      setPasswordMessage("");

                      await putUser(
                        user.user_id,
                        {
                          first_name: firstName,
                          last_name: lastName,
                          email: email,
                          birthdate: birthdate || null,
                          filename: filename,
                        },
                        localStorage.getItem("token"),
                      );

                      if (profileFile) {
                        await putProfilePicture(
                          user.user_id,
                          profileFile,
                          localStorage.getItem("token"),
                        );
                      }

                      if (currentPassword && newPassword) {
                        await putPassword(
                          currentPassword,
                          newPassword,
                          localStorage.getItem("token"),
                        );
                      }

                      window.location.reload();
                    } catch (error) {
                      //console.log(error.message);
                      if (error.message.includes("Unexpected token")) {
                        setPasswordMessage("Current password is incorrect");
                      } else {
                        setPasswordMessage(error.message);
                      }
                    }
                  }}
                  className="rounded-full bg-[#83a997] px-5 py-2.5 font-semibold text-white transition hover:bg-[#628b78]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-full bg-[#ff2b59] px-5 py-2.5 font-semibold text-white transition hover:bg-[#d96891]"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setFirstName(user?.first_name || "");
                  setLastName(user?.last_name || "");
                  setEmail(user?.email || "");
                  setBirthdate(user?.birthdate?.slice(0, 10) || "");
                  setFilename(user?.filename || "");
                  setEditing(true);
                }}
                className="rounded-full bg-[#d982a8] px-5 py-2.5 font-semibold text-white transition hover:bg-[#d96891]"
              >
                Edit
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-[#eaf7f1] px-5 py-2.5 font-semibold text-[#574752] transition hover:bg-[#d9f0e7]"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="flex size-45 shrink-0 items-center justify-center overflow-hidden rounded-full border-8 border-white bg-[#d9f0e7] text-6xl text-[#607fa3] shadow-[0_8px_20px_rgba(100,70,80,0.1)]">
          {user?.filename ? (
            <img
              src={`${import.meta.env.VITE_UPLOAD_URL}/${user.filename}`}
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
