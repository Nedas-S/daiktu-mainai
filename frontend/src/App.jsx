import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import ItemsPage from "./components/ItemsPage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleAuth = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    // Jei nėra token – rodom prisijungimo/registracijos formą
    return <AuthPage onAuth={handleAuth} />;
  }

  // Jei prisijungęs – rodom daiktų puslapį
  return <ItemsPage token={token} onLogout={handleLogout} />;
}
