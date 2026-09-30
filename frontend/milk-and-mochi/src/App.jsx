import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./views/Home.jsx";
import LoginRegister from "./views/LoginRegister.jsx";
import "./App.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import Menu from "./views/Menu.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login-register" element={<LoginRegister />} />
            <Route path="/menu" element={<Menu />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
