import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { useAuthentication } from "../hooks/apiHooks.js";

const LoginRegister = () => {
  const { handleLogin } = useContext(UserContext);
  const { postRegister } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  return (
    <div className="mx-auto mt-22.5 min-h-screen w-full max-w-375 bg-[#fff8fb]">
      <main>
        <h2 className="mt-2 pt-5 text-center text-4xl font-semibold text-[#d982a8]">
          Welcome
        </h2>

        <p className="mt-2 text-center text-[#665d63]">
          Log in or create an account.
        </p>

        <div className="mt-8 flex justify-center gap-7.5 px-5 pb-12 max-md:flex-col max-md:items-center">
          {/* Log In */}
          <section className="w-87.5 rounded-2xl border-2 border-[#f3dce6] bg-white p-7.5 shadow-[0_8px_25px_rgba(100,70,80,0.08)] max-md:w-full max-md:max-w-105">
            <h2 className="mb-5 text-2xl font-semibold text-[#d982a8]">
              Log In
            </h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin({ email, password });
              }}
              className="flex flex-col"
            >
              <label className="mt-4 mb-1 font-semibold">Email</label>

              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-[11px] border border-[#c9bfc5] bg-[#fffdfd] p-2.5 text-[#574752] outline-none transition focus:border-[#d982a8] focus:ring-3 focus:ring-[#d982a8]/15"
              />

              <label className="mt-4 mb-1 font-semibold">Password</label>

              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-[11px] border border-[#c9bfc5] bg-[#fffdfd] p-2.5 text-[#574752] outline-none transition focus:border-[#d982a8] focus:ring-3 focus:ring-[#d982a8]/15"
              />

              <button
                type="submit"
                className="mt-5 rounded-full bg-[#d982a8] px-5 py-2.5 font-semibold text-white transition hover:-translate-y-px hover:bg-[#d96891]"
              >
                Log In
              </button>
            </form>
          </section>

          {/* Register */}
          <section className="w-87.5 rounded-2xl border-2 border-[#d6ece2] bg-white p-7.5 shadow-[0_8px_25px_rgba(100,70,80,0.08)] max-md:w-full max-md:max-w-105">
            <h2 className="mb-5 text-2xl font-semibold text-[#83a997]">
              Register
            </h2>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                try {
                  await postRegister({
                    first_name: firstName,
                    last_name: lastName,
                    email: registerEmail,
                    password: registerPassword,
                  });

                  await handleLogin({
                    email: registerEmail,
                    password: registerPassword,
                  });
                } catch (error) {
                  console.log(error.message);
                }
              }}
              className="flex flex-col"
            >
              <label className="mt-4 mb-1 font-semibold">First name</label>

              <input
                type="text"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="rounded-[11px] border border-[#c9bfc5] bg-[#fffdfd] p-2.5 text-[#574752] outline-none transition focus:border-[#d982a8] focus:ring-3 focus:ring-[#d982a8]/15"
              />

              <label className="mt-4 mb-1 font-semibold">Last name</label>

              <input
                type="text"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="rounded-[11px] border border-[#c9bfc5] bg-[#fffdfd] p-2.5 text-[#574752] outline-none transition focus:border-[#d982a8] focus:ring-3 focus:ring-[#d982a8]/15"
              />

              <label className="mt-4 mb-1 font-semibold">Email</label>

              <input
                type="email"
                autoComplete="email"
                required
                value={registerEmail}
                onChange={(event) => setRegisterEmail(event.target.value)}
                className="rounded-[11px] border border-[#c9bfc5] bg-[#fffdfd] p-2.5 text-[#574752] outline-none transition focus:border-[#d982a8] focus:ring-3 focus:ring-[#d982a8]/15"
              />

              <label className="mt-4 mb-1 font-semibold">Password</label>

              <input
                type="password"
                minLength="6"
                autoComplete="new-password"
                required
                value={registerPassword}
                onChange={(event) => setRegisterPassword(event.target.value)}
                className="rounded-[11px] border border-[#c9bfc5] bg-[#fffdfd] p-2.5 text-[#574752] outline-none transition focus:border-[#d982a8] focus:ring-3 focus:ring-[#d982a8]/15"
              />

              <button
                type="submit"
                className="mt-5 rounded-full bg-[#83a997] px-5 py-2.5 font-semibold text-white transition hover:-translate-y-px hover:bg-[#628b78]"
              >
                Register
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginRegister;
