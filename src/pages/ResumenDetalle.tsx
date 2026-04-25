import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ResumenDetalle.css";

interface Denuncia {
  descripcion: string;
  estado: string;
  gravedad: number;
  fuenteUrl?: string;
  tipo: "SENTENCIA" | "INVESTIGACION" | string;
  fuente: string;
}

interface ResumenCandidato {
  nombre: string;
  partido: string;
  resumen: string;
  propuestas: string[];
  perfil: string;
  pdfUrl: string;
  fotoUrl: string;
  denuncias: Denuncia[];
  logoPartidoUrl: string;
}

export default function ResumenDetalle() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ResumenCandidato | null>(null);
  const [vista, setVista] = useState<"resumen" | "perfil" | "investigaciones">("resumen");

  // Estandarización de URLs (Vite)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
  const BASE_SERVER_URL = API_URL.replace("/api", "");

  useEffect(() => {
    fetch(`${API_URL}/resumen/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        return res.json();
      })
      .then((json: ResumenCandidato) => setData(json))
      .catch((err) => console.error("Error cargando detalle:", err));
  }, [id, API_URL]);

  if (!data) return <div className="loading-dark">Cargando información oficial...</div>;

  const totalSentencias = data.denuncias?.filter(d => d.tipo === 'SENTENCIA').length || 0;
  const totalInvestigaciones = data.denuncias?.filter(d => d.tipo === 'INVESTIGACION').length || 0;

  return (
    <div className="detalle-container">
      {/* CARD SUPERIOR */}
      <div className="candidato-hero-card">
        <div className="hero-content">
          <div className="foto-frame">
            <img 
              src={`${BASE_SERVER_URL}${data.fotoUrl}`} 
              alt={data.nombre} 
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300?text=Candidato")}
            />
          </div>
          
          <div className="hero-text">
            <div className="header-info">
               <h1>{data.nombre}</h1>
               <div className="partido-tag">
                <img 
                  src={`${BASE_SERVER_URL}${data.logoPartidoUrl}`} 
                  alt="logo partido" 
                  className="logo-partido-mini" 
                />
                <span className="nombre-partido">{data.partido}</span>
              </div>
            </div>

            <div className="stats-badges-container">
              <div className={`status-badge ${totalSentencias > 0 ? 'red' : 'green'}`}>
                {totalSentencias > 0 ? `⚠️ ${totalSentencias} Sentencias` : '✅ Sin sentencias'}
              </div>
              
              <div className={`status-badge ${totalInvestigaciones > 0 ? 'orange' : 'green'}`}>
                {totalInvestigaciones > 0 ? `🔍 ${totalInvestigaciones} Investigaciones` : '✅ Sin investigaciones'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS DE NAVEGACIÓN */}
      <div className="nav-tabs">
        <button 
          className={vista === "resumen" ? "active" : ""} 
          onClick={() => setVista("resumen")}
        >
          📘 Resumen
        </button>
        <button 
          className={vista === "perfil" ? "active" : ""} 
          onClick={() => setVista("perfil")}
        >
          👤 Perfil
        </button>
        <button 
          className={vista === "investigaciones" ? "active" : ""} 
          onClick={() => setVista("investigaciones")}
        >
          🔍 Investigaciones
        </button>
        {data.pdfUrl && (
          <a 
            href={`${BASE_SERVER_URL}${data.pdfUrl}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-plan-link"
          >
            📄 Plan de Gobierno
          </a>
        )}
      </div>

      {/* CUERPO DE INFORMACIÓN */}
      <div className="info-main-card">
        {vista === "resumen" && (
          <div className="fade-in">
            <h2 className="section-title">Resumen Legislativo</h2>
            <div className="text-content">
              {data.resumen?.split('\n').map((p, i) => (
                p.trim() && <p key={i}>{p}</p>
              ))}
            </div>
            <h3 className="section-title">Propuestas Clave</h3>
            <ul className="propuestas-grid">
              {data.propuestas?.map((p, i) => (
                <li key={i} className="propuesta-bullet">{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ... (Las secciones de perfil e investigaciones se mantienen iguales, 
             ya que usan los datos cargados en 'data') */}
        
        {vista === "perfil" && (
          <div className="fade-in">
            <h2 className="section-title">Perfil del Candidato</h2>
            <div className="text-content">
              {data.perfil?.split('\n').map((p, i) => (
                p.trim() && <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {vista === "investigaciones" && (
          <div className="fade-in">
            <h2 className="section-title">Historial de Investigaciones</h2>
            <div className="denuncias-wrapper">
              {data.denuncias && data.denuncias.length > 0 ? (
                data.denuncias.map((d, i) => (
                  <div key={i} className={`denuncia-card-new ${d.tipo}`}>
                    <div className="denuncia-header">
                      <span className="denuncia-type-badge">
                        {d.tipo === 'SENTENCIA' ? '⚖️ SENTENCIA' : '🔍 INVESTIGACIÓN'}
                      </span>
                      <span className="denuncia-status-badge">
                        Estado: <strong>{d.estado}</strong>
                      </span>
                    </div>
                    <div className="denuncia-content">
                      {d.descripcion?.split('\n').map((linea, index) => (
                        linea.trim() && <p key={index} className="denuncia-line">{linea}</p>
                      ))}
                    </div>
                    <div className="denuncia-footer">
                      <small>Fuente: {d.fuente}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="clean-record">✅ No registra antecedentes oficiales.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}