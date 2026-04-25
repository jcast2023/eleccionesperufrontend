import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

interface Mensaje {
  tipo: "user" | "bot";
  texto: string;
}

interface Candidato {
  id: number;
  nombre: string;
  partido: string;
}

export default function Chatbot() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatoId, setCandidatoId] = useState<number | "">("");
  const [categoria, setCategoria] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // Usamos la variable de entorno de Vite con un fallback de seguridad
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  useEffect(() => {
    // Carga de candidatos usando la variable de entorno
    fetch(`${API_URL}/candidatos`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar candidatos");
        return res.json();
      })
      .then(setCandidatos)
      .catch(err => console.error("Error API Candidatos:", err));
  }, [API_URL]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [mensajes, loading]);

  const enviarMensaje = async () => {
    if (!input.trim()) return;
    if (!candidatoId) {
      alert("Selecciona un candidato");
      return;
    }

    const nuevoMensaje: Mensaje = { tipo: "user", texto: input };
    setMensajes(prev => [...prev, nuevoMensaje]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: input, candidatoId, categoria })
      });

      if (!res.ok) throw new Error("Error en la respuesta del bot");

      const data = await res.json();
      setMensajes(prev => [...prev, { tipo: "bot", texto: data.respuesta }]);
    } catch (error) {
      console.error("Error al conectar con el chat:", error);
      setMensajes(prev => [...prev, { tipo: "bot", texto: "Lo siento, hubo un error al conectar con el servidor." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") enviarMensaje();
  };

  const limpiarChat = () => {
    setMensajes([]);
    setInput("");
    setCategoria("");
    setCandidatoId("");
  };

  const categorias = [
    "economia", "seguridad", "educacion", "salud",
    "corrupcion", "estado", "medio ambiente",
    "infraestructura", "social", "libertad"
  ];

  const candidatoSeleccionado = candidatos.find(c => c.id === candidatoId);

  return (
    <div className="cb-page">
      <div className="cb-wrapper">
        {/* HEADER */}
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar">🤖</div>
            <div>
              <h2 className="cb-title">Chatbot Electoral</h2>
              <p className="cb-subtitle">
                {candidatoSeleccionado
                  ? `Consultando sobre ${candidatoSeleccionado.nombre}`
                  : "Selecciona un candidato para comenzar"}
              </p>
            </div>
          </div>
          <button className="cb-btn-limpiar" onClick={limpiarChat}>
            🗑 Limpiar
          </button>
        </div>

        {/* FILTROS */}
        <div className="cb-filtros">
          <select
            className="cb-select"
            value={candidatoId}
            onChange={(e) => {
              const value = e.target.value;
              setCandidatoId(value === "" ? "" : Number(value));
            }}
          >
            <option value="">👤 Selecciona candidato</option>
            {candidatos.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre} — {c.partido}
              </option>
            ))}
          </select>

          <select
            className="cb-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">🗂 Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* CHAT BOX */}
        <div className="cb-chat-box" ref={chatRef}>
          {mensajes.length === 0 && !loading && (
            <div className="cb-empty">
              <div className="cb-empty-icon">💬</div>
              <p>Haz una pregunta sobre el plan de gobierno de un candidato</p>
            </div>
          )}

          {mensajes.map((m, i) => (
            <div key={i} className={"cb-mensaje cb-" + m.tipo}>
              {m.tipo === "bot" && (
                <div className="cb-bot-avatar">🤖</div>
              )}
              <div className="cb-burbuja">{m.texto}</div>
              {m.tipo === "user" && (
                <div className="cb-user-avatar">👤</div>
              )}
            </div>
          ))}

          {loading && (
            <div className="cb-mensaje cb-bot">
              <div className="cb-bot-avatar">🤖</div>
              <div className="cb-burbuja cb-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="cb-input-row">
          <input
            className="cb-input"
            type="text"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="cb-send-btn"
            onClick={enviarMensaje}
            disabled={loading}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}