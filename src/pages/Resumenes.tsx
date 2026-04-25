import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Resumenes.css";

interface Candidato {
  id: number;
  nombre: string;
  partido: string;
  fotoUrl: string;
  logoPartidoUrl: string;
  sentenciasCount: number;      
  investigacionesCount: number;
}

export default function Resumenes() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [partidoFiltro, setPartidoFiltro] = useState("");

  // Estandarización de la URL Base (Vite)
  // Quitamos el "/api" para las imágenes, ya que ellas suelen colgar de la raíz del servidor
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
  const BASE_SERVER_URL = API_URL.replace("/api", ""); 

  useEffect(() => {
    fetch(`${API_URL}/candidatos`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener candidatos");
        return res.json();
      })
      .then(setCandidatos)
      .catch(err => console.error("Error cargando candidatos:", err));
  }, [API_URL]);

  const partidos = [...new Set(candidatos.map(c => c.partido))];

  const filtrados = candidatos.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (partidoFiltro === "" || c.partido === partidoFiltro)
  );

  return (
    <div className="resumenes-page">

      {/* HEADER */}
      <div className="resumenes-header">
        <h1 className="resumenes-title">Resúmenes de Candidatos</h1>
        <p className="resumenes-subtitle">
          Conoce las propuestas de cada candidato antes de votar
        </p>
      </div>

      {/* FILTROS */}
      <div className="resumenes-filtros">
        <div className="filtro-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar candidato..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="resumenes-input"
          />
        </div>

        <select
          value={partidoFiltro}
          onChange={(e) => setPartidoFiltro(e.target.value)}
          className="resumenes-select"
        >
          <option value="">Todos los partidos</option>
          {partidos.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* COUNTER */}
      <p className="resumenes-counter">
        Mostrando <strong>{filtrados.length}</strong> candidato{filtrados.length !== 1 ? "s" : ""}
      </p>

      {/* GRID */}
      <div className="resumenes-grid">
        {filtrados.map(c => (
          <Link to={`/resumenes/${c.id}`} key={c.id} className="candidato-link">
            <div className="candidato-card-nuevo">
              <div className="candidato-foto-wrapper">
                <img
                  src={`${BASE_SERVER_URL}${c.fotoUrl}`}
                  alt={c.nombre}
                  className="candidato-foto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Sin+Foto";
                  }}
                />
                <div className="candidato-overlay">
                  <span className="ver-mas">Ver resumen →</span>
                </div>
              </div>

              <div className="candidato-info">
                <h3 className="candidato-nombre">{c.nombre}</h3>
                <div className="candidato-partido-row">
                  <img
                    src={`${BASE_SERVER_URL}${c.logoPartidoUrl}`}
                    alt={c.partido}
                    className="candidato-logo-partido"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/50?text=Logo";
                    }}
                  />
                  <span className="candidato-partido-nombre">{c.partido}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="resumenes-empty">
          <span>😕</span>
          <p>No se encontraron candidatos con esos filtros</p>
        </div>
      )}
    </div>
  );
}