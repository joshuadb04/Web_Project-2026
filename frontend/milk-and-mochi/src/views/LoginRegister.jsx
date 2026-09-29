import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

import Header from "../components/Header";

const LoginRegister = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header />

      <div className="mx-auto mt-22.5 min-h-screen w-full max-w-375 bg-[#fff8fb]">
        <main>
          <h2 className="pt-12 text-center text-4xl font-semibold text-[#574752]">
            Welcome
          </h2>

          <p className="mt-3 text-center">Log in or create a new account.</p>

          <div className="mt-8 flex justify-center gap-7.5">
            {/* Log In */}
            <section className="w-87.5 rounded-2xl border-2 border-[#f3dce6] bg-white p-7.5">
              <h2 className="mb-5 text-2xl font-semibold text-[#574752]">
                Log In
              </h2>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleLogin({ email, password });
                }}
              >
                <label className="mt-4 mb-1 block font-semibold">
                  Username or email
                </label>

                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded border border-[#999] p-2.5"
                />

                <label className="mt-4 mb-1 block font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded border border-[#999] p-2.5"
                />

                <button
                  type="submit"
                  className="mt-5 rounded-full bg-[#d982a8] px-5 py-2.5 font-semibold text-white hover:bg-[#b96891]"
                >
                  Log In
                </button>
              </form>
            </section>

            {/* Register */}
            <section className="w-87.5 rounded-2xl border-2 border-[#f3dce6] bg-white p-7.5">
              <h2 className="mb-5 text-2xl font-semibold text-[#574752]">
                Register
              </h2>

              <form>
                <label className="mt-4 mb-1 block font-semibold">
                  Username
                </label>

                <input
                  type="text"
                  autoComplete="username"
                  required
                  className="w-full rounded border border-[#999] p-2.5"
                />

                <label className="mt-4 mb-1 block font-semibold">Email</label>

                <input
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded border border-[#999] p-2.5"
                />

                <label className="mt-4 mb-1 block font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  minLength="6"
                  autoComplete="new-password"
                  required
                  className="w-full rounded border border-[#999] p-2.5"
                />

                <button
                  type="submit"
                  className="mt-5 rounded-full bg-[#d982a8] px-5 py-2.5 font-semibold text-white hover:bg-[#b96891]"
                >
                  Register
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginRegister;
