import React, { useState, useEffect } from "react";

export default function ItemsPage({ token, onLogout }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  // 1) Parsisiunčia daiktus
  const loadItems = async () => {
    try {
      const res = await fetch("/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return setItems([]);
      const data = await res.json();
      setItems(data);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // 2) Formos submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    Array.from(files).forEach((f) => formData.append("images", f));

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error();
      await res.json();
      setTitle("");
      setDescription("");
      setFiles([]);
      loadItems();
    } catch {
      alert("Nepavyko įkelti daikto");
    }
  };

  // 3) Trinimas
  const handleDelete = async (id) => {
    if (!window.confirm("Ištrinti?")) return;
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      loadItems();
    } catch {
      alert("Nepavyko ištrinti");
    }
  };

  return (
    <div
      style={{ maxWidth: 800, margin: "auto", padding: "1rem", color: "#fff" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Visi daiktai</h2>
        <button
          onClick={onLogout}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: ".4rem .8rem",
          }}
        >
          Atsijungti
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ margin: "2rem 0" }}>
        <h3>Įkelk daiktą</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pavadinimas"
          required
          style={{ width: "100%", padding: ".5rem", marginBottom: ".5rem" }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Aprašymas"
          required
          style={{
            width: "100%",
            padding: ".5rem",
            height: 80,
            marginBottom: ".5rem",
          }}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
          style={{ marginBottom: ".5rem" }}
        />
        <button
          type="submit"
          style={{
            background: "#3498db",
            color: "#fff",
            padding: ".6rem 1rem",
            border: "none",
            borderRadius: 4,
          }}
        >
          Įkelti
        </button>
      </form>

      {items.length === 0 ? (
        <p>Nėra daiktų</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: "1rem",
          }}
        >
          {items.map((it) => (
            <div
              key={it.id}
              style={{ background: "#222", padding: ".5rem", borderRadius: 4 }}
            >
              {it.imageUrls.map((u, i) => (
                <img
                  key={i}
                  src={u}
                  alt=""
                  style={{ width: "100%", marginBottom: 4 }}
                />
              ))}
              <h4>{it.title}</h4>
              <p>{it.description}</p>
              <button
                onClick={() => handleDelete(it.id)}
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: ".4rem .8rem",
                }}
              >
                Ištrinti
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
