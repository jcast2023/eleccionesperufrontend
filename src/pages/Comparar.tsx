import { useEffect, useState } from "react";
import RadarChartCompare from "../components/RadarChartCompare";
import { compararCandidatos } from "../services/api";
import "./Comparar.css";

interface RadarData {
  categoria: string;
  valor1: number;
  valor2: number;
}

interface Candidato {
  id: number;
  nombre: string;
}

interface ComparacionResponse {
  candidato1: string;
  candidato2: string;
  radar: RadarData[];
  coincidencias: string[];
  diferencias: string[];
  porcentajeCoincidencia: number;
}

export default function Comparar() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [c1, setC1] = useState<number>(0);
  const [c2, setC2] = useState<number>(0);
  const [dataRadar, setDataRadar] = useState<RadarData[]>([]);
  const [comparacion, setComparacion] = useState<ComparacionResponse | null>(null);

  // Definimos la constante de la API usando Vite
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  // Cargar candidatos
  useEffect(() => {
    // Usamos la variable de entorno aquí también
    fetch(`${API_URL}/candidatos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición de candidatos");
        return res.json();
      })
      .then((data: Candidato[]) => {
        setCandidatos(data);
        if (data.length >= 2) {
          setC1(data[0].id);
          setC2(data[1].id);
        }
      })
      .catch(err => console.error("Error al cargar candidatos:", err));
  }, [API_URL]);

  // Comparación con orden fijo
  useEffect(() => {
    if (c1 && c2 && c1 !== c2) {
      compararCandidatos(c1, c2)
        .then((data: ComparacionResponse) => {
          const ordenFijo = [
            "Seguridad", "Corrupción", "Economía", "Educación",
            "Salud", "Infraestructura", "Medio Ambiente",
            "Estado", "Social", "Libertad"
          ];

          const radarOrdenado = ordenFijo.map((cat) => {
            const item = data.radar.find((r) => r.categoria === cat);
            return item || { categoria: cat, valor1: 0, valor2: 0 };
          });

          setComparacion(data);
          setDataRadar(radarOrdenado);
        })
        .catch((err) => console.error("Error comparando:", err));
    }
  }, [c1, c2]);

  const nombreC1 = candidatos.find((c) => c.id === c1)?.nombre || "Candidato 1";
  const nombreC2 = candidatos.find((c) => c.id === c2)?.nombre || "Candidato 2";

  const porcentaje = comparacion?.porcentajeCoincidencia || 0;
  const coincidencias = comparacion?.coincidencias || [];
  const diferencias = comparacion?.diferencias || [];

  const getMensajeAfinidad = (porc: number) => {
    if (porc >= 70) return "Alta afinidad";
    if (porc >= 45) return "Afinidad moderada";
    return "Baja coincidencia";
  };

  return (
    <div className="container">
      <h1>⚖️ Comparar candidatos</h1>

      <div className="comparar-select">
        <select value={c1} onChange={(e) => setC1(Number(e.target.value))}>
          {candidatos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <span>VS</span>
        <select value={c2} onChange={(e) => setC2(Number(e.target.value))}>
          {candidatos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      <div className="comparar-cards">
        <div className="card fade-in">
          <h2>{nombreC1}</h2>
          <div className="info-comparacion">
            <p className={`porcentaje ${porcentaje >= 70 ? 'alto' : porcentaje >= 45 ? 'medio' : 'bajo'}`}>
              {porcentaje.toFixed(0)}% coincidencia
            </p>
            <p>Coinciden en <strong>{coincidencias.length} de 10</strong> categorías</p>
            {coincidencias.length > 0 && (
              <p className="temas">Ej: {coincidencias.slice(0, 3).join(", ")}</p>
            )}
            <p className="afinidad">{getMensajeAfinidad(porcentaje)}</p>
          </div>
        </div>

        <div className="card fade-in">
          <h2>{nombreC2}</h2>
          <div className="info-comparacion">
            <p className={`porcentaje ${porcentaje >= 70 ? 'alto' : porcentaje >= 45 ? 'medio' : 'bajo'}`}>
              {porcentaje.toFixed(0)}% coincidencia
            </p>
            <p>Difieren en <strong>{diferencias.length} de 10</strong> categorías</p>
            {diferencias.length > 0 && (
              <p className="temas">Ej: {diferencias.slice(0, 3).join(", ")}</p>
            )}
            <p className="afinidad">{getMensajeAfinidad(porcentaje)}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>📊 Comparación por propuestas</h3>
        {dataRadar.length > 0 ? (
          <RadarChartCompare
            data={dataRadar}
            candidato1={nombreC1}
            candidato2={nombreC2}
          />
        ) : (
          <p>Cargando comparación...</p>
        )}
      </div>
    </div>
  );
}