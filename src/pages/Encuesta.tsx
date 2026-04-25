import { useState } from "react";
import { enviarRespuestas } from "../services/api";
import type { Respuestas, Resultado } from "../types/encuesta";
import RadarChartComponent from "../components/RadarChartSimple";
import "./Encuesta.css";

export default function Encuesta() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [finalizado, setFinalizado] = useState(false);

  const preguntas = [
    { id: 1, texto: "¿Qué tan importante es la lucha contra la corrupción?" },
    { id: 2, texto: "¿Apoyas más inversión en seguridad ciudadana?" },
    { id: 3, texto: "¿Prefieres mayor inversión en educación pública?" },
    { id: 4, texto: "¿Reducir impuestos a empresas?" },
    { id: 5, texto: "¿Reducir tamaño del Estado?" },
    { id: 6, texto: "¿Importancia del medio ambiente?" },
    { id: 7, texto: "¿Inversión privada en salud?" },
    { id: 8, texto: "¿Renegociar contratos mineros?" },
    { id: 9, texto: "¿Penas más duras contra criminales?" },
    { id: 10, texto: "¿Más gasto en infraestructura?" },
    { id: 11, texto: "¿Políticas de inclusión social?" },
    { id: 12, texto: "¿Mayor control a medios?" }
  ];

  const responder = (valor: number) => {
    const id = preguntas[paso].id;
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
    if (paso < preguntas.length - 1) {
      setPaso(paso + 1);
    } else {
      enviar();
    }
  };

  const enviar = async () => {
    try {
      const data = await enviarRespuestas(respuestas);
      setResultados(data);
      setFinalizado(true);
    } catch (error) {
      console.error("Error al enviar respuestas", error);
    }
  };

  const progreso = ((paso + 1) / preguntas.length) * 100;

  const opcionesConfig = [
    { valor: 1, label: "Muy en desacuerdo", emoji: "😠" },
    { valor: 2, label: "En desacuerdo",     emoji: "🙁" },
    { valor: 3, label: "Neutral",           emoji: "😐" },
    { valor: 4, label: "De acuerdo",        emoji: "🙂" },
    { valor: 5, label: "Muy de acuerdo",    emoji: "😊" },
  ];

  const medallaColor = ["#F59E0B", "#94A3B8", "#CD7C2F"];

  return (
    <div className="enc-page">

      {!finalizado ? (
        <div className="enc-quiz-wrapper">

          {/* HEADER */}
          <div className="enc-header">
            <span className="enc-badge">Test de Afinidad</span>
            <h1 className="enc-title">Encuesta Política</h1>
            <p className="enc-subtitle">Responde honestamente para conocer tu afinidad política</p>
          </div>

          {/* PROGRESO */}
          <div className="enc-progress-wrapper">
            <div className="enc-progress-info">
              <span>Pregunta {paso + 1} de {preguntas.length}</span>
              <span>{Math.round(progreso)}%</span>
            </div>
            <div className="enc-progress-track">
              <div className="enc-progress-fill" style={{ width: `${progreso}%` }} />
            </div>
          </div>

          {/* CARD PREGUNTA */}
          <div className="enc-card fade-in">
            <div className="enc-pregunta-num">#{paso + 1}</div>
            <h2 className="enc-pregunta-texto">{preguntas[paso].texto}</h2>

            <div className="enc-opciones">
              {opcionesConfig.map((op) => (
                <button
                  key={op.valor}
                  className="enc-opcion"
                  onClick={() => responder(op.valor)}
                >
                  <span className="enc-opcion-emoji">{op.emoji}</span>
                  <span className="enc-opcion-label">{op.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* DOTS */}
          <div className="enc-dots">
            {preguntas.map((_, i) => (
              <div
                key={i}
                className={"enc-dot" + (i < paso ? " done" : "") + (i === paso ? " active" : "")}
              />
            ))}
          </div>
        </div>

      ) : (
        <div className="enc-resultados-wrapper">

          <div className="enc-header">
            <h1 className="enc-title">📊 Tu afinidad política</h1>
            <p className="enc-subtitle">Basado en tus respuestas, estos son tus candidatos más afines</p>
          </div>

          {/* TOP 3 */}
          <div className="enc-resultados-grid">
            {resultados.slice(0, 3).map((r, i) => (
              <div key={i} className={"enc-resultado-card fade-in" + (i === 0 ? " enc-top" : "")}>

                <div className="enc-medalla" style={{ background: medallaColor[i] }}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                </div>

                <h3 className="enc-candidato-nombre">{r.candidato}</h3>

                <div className="enc-porcentaje-wrapper">
                  <span className="enc-porcentaje">{r.porcentaje.toFixed(1)}%</span>
                  <span className="enc-porcentaje-label">afinidad</span>
                </div>

                <div className="enc-barra-track">
                  <div className="enc-barra-fill" style={{ width: `${r.porcentaje}%` }} />
                </div>

                {r.mensaje && <p className="enc-mensaje">{r.mensaje}</p>}
                {r.explicacion && <p className="enc-explicacion">{r.explicacion}</p>}

                <div className={"enc-riesgo enc-riesgo-" + r.riesgo.toLowerCase()}>
                  Riesgo: {r.riesgo}
                </div>

                {r.totalDenuncias > 0 && (
                  <div className="enc-denuncias">
                    <h4>⚠️ Denuncias ({r.totalDenuncias})</h4>
                    {r.denuncias.map((d, idx) => (
                      <div key={idx} className="enc-denuncia-item">
                        <p><strong>{d.tipo}</strong>: {d.descripcion}</p>
                        <p>Estado: {d.estado} · Fuente: {d.fuente}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* GRÁFICO */}
          {resultados.length > 0 && (
            <div className="enc-grafico-card">
              <h3>📈 Perfil del candidato más afín</h3>
              <RadarChartComponent
                data={[
                  ...resultados[0].coincidencias.map((t) => ({
                    tema: t,
                    valor: resultados[0].porcentaje / 20
                  })),
                  ...resultados[0].diferencias.map((t) => ({
                    tema: t,
                    valor: (resultados[0].porcentaje / 20) * 0.5
                  }))
                ]}
              />
            </div>
          )}

        </div>
      )}
    </div>
  );
}