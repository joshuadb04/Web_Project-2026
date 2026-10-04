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
import Admin from "./views/AdminPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import Cart from "./views/Cart.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login-register" element={<LoginRegister />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/single" element={<Single />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="/edit" element={<Edit />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <Admin />
                  </AdminProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
