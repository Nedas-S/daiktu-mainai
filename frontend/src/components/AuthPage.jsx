import React, { useState } from "react";

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login"); // arba "register"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = mode === "login" ? "/api/login" : "/api/register";
      const body =
        mode === "login"
          ? { email, password }
          : { username, email, password, location };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Klaida");

      if (mode === "login") {
        onAuth(data.token);
      } else {
        alert("Registracija sėkminga! Dabar prisijunk.");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "auto", padding: "2rem", color: "#fff" }}
    >
      <h2>{mode === "login" ? "Prisijungimas" : "Registracija"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div style={{ marginBottom: ".5rem" }}>
            <label>Vardas:</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: ".4rem" }}
            />
          </div>
        )}
        <div style={{ marginBottom: ".5rem" }}>
          <label>El. paštas:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: ".4rem" }}
          />
        </div>
        <div style={{ marginBottom: ".5rem" }}>
          <label>Slaptažodis:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: ".4rem" }}
          />
        </div>
        {mode === "register" && (
          <div style={{ marginBottom: ".5rem" }}>
            <label>Vieta:</label>
            <br />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: "100%", padding: ".4rem" }}
            />
          </div>
        )}
        {error && <p style={{ color: "salmon" }}>{error}</p>}
        <button
          type="submit"
          style={{
            background: "#3498db",
            color: "#fff",
            padding: ".6rem 1rem",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {mode === "login" ? "Prisijungti" : "Registruotis"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        {mode === "login" ? "Dar neturi paskyros? " : "Jau turi paskyrą? "}
        <button
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
          style={{
            background: "none",
            color: "#1abc9c",
            border: "none",
            cursor: "pointer",
          }}
        >
          {mode === "login" ? "Registruokis" : "Prisijunk"}
        </button>
      </p>
    </div>
  );
}
