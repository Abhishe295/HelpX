import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./components/Layout";
import { useAuthStore } from "./store/authStores.js";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import HelperPage from "./pages/HelperPage";
import AdminPage from "./pages/AdminPage";
import { useThemeStore } from "./lib/useTheme.js";

function App() {
  const { checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div data-theme={theme}>
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/helper" element={<HelperPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
    </div>
  );
}

export default App;
