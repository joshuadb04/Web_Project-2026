import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./views/Home.jsx";
import LoginRegister from "./views/LoginRegister.jsx";
import "./App.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import Menu from "./views/Menu.jsx";
import Single from "./views/Single.jsx";
import Profile from "./views/Profile.jsx";
import Edit from "./views/Edit.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login-register" element={<LoginRegister />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/single" element={<Single />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit" element={<Edit />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
