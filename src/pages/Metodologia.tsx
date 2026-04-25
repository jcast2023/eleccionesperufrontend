import React from 'react';

import './PageStyles.css';   // Agrega esta línea al inicio de ambos archivos

const Metodologia: React.FC = () => {
  return (
    <>
      <div className="page-container">
        <div className="content-wrapper">
          <div className="info-card">
            <h1>Metodología de Evaluación</h1>
            
            <div className="card-content">
              <p className="intro">
                VotaBienPe Perú utiliza un sistema híbrido de Inteligencia Artificial impulsado por OpenAI, 
                junto con Procesamiento de Lenguaje Natural (NLP). Esto nos permite conectar tus posiciones 
                ideológicas directamente con los Planes de Gobierno Oficiales de los partidos políticos.
              </p>

              <p className="nota">
                <strong>Nota:</strong> El partido Perú Federal de Armande Massé está incluido pero se busco información 
                en las redes ya que no contaba con un plan de gobierno oficial publicado.
              </p>

              <section>
                <h2>1. El Test de Afinidad Electoral</h2>
                <p>
                  El Test consta de <strong>12 preguntas</strong> cuidadosamente diseñadas según la coyuntura 
                  actual peruana y las prioridades de la población. Nos enfocamos en dilemas prácticos reales.
                </p>

                <h3>Escala de Respuesta (Likert ponderada)</h3>
                <ul>
                  <li>Muy en desacuerdo <strong>(-2)</strong></li>
                  <li>En desacuerdo <strong>(-1)</strong></li>
                  <li>Neutral <strong>(0)</strong></li>
                  <li>De acuerdo <strong>(+1)</strong></li>
                  <li>Muy de acuerdo <strong>(+2)</strong></li>
                </ul>
              </section>

              <section>
                <h2>Los 5 Ejes Ideológicos Peruanos</h2>
                <p>Cada pregunta está vinculada a uno o más de los siguientes ejes fundamentales:</p>
                <ol>
                  <li><strong>Economía</strong>: Intervencionismo y Redistribución vs. Mercado Libre e Inversión Privada</li>
                  <li><strong>Autoridad y Estado de Derecho</strong>: Enfoque Garantista vs. Enfoque Punitivo (Mano Dura)</li>
                  <li><strong>Tamaño del Estado</strong>: Estado Asistencialista vs. Estado Mínimo y Eficiencia</li>
                  <li><strong>Política Exterior</strong>: Soberanismo/Proteccionismo vs. Globalización e Integración</li>
                  <li><strong>Valores y Sociedad</strong>: Visión Conservadora vs. Visión Progresista</li>
                </ol>
              </section>

              <section>
                <h2>2. Evaluación de Partidos mediante IA (Sistema RAG)</h2>
                <p>
                  Las posiciones de los partidos se extraen <strong>estrictamente</strong> de sus Planes de Gobierno Oficiales 
                  usando tecnología RAG (Retrieval-Augmented Generation). Esto evita alucinaciones y mantiene total fidelidad al documento.
                </p>

                <h3>Proceso:</h3>
                <ul>
                  <li>Los PDFs oficiales son procesados, limpiados y convertidos en embeddings vectoriales.</li>
                  <li>La IA evalúa las 12 preguntas basándose únicamente en el contenido real del plan.</li>
                  <li>Si no hay información suficiente sobre un tema, se asigna puntaje neutral o se declara explícitamente.</li>
                </ul>
              </section>

              <section>
                <h2>3. Algoritmo de Coincidencia (Score de Afinidad)</h2>
                <p>
                  El porcentaje de afinidad que ves combina dos mediciones:
                </p>
                <ul>
                  <li><strong>65%</strong> → Similitud pregunta por pregunta (de las 12 preguntas)</li>
                  <li><strong>35%</strong> → Similitud en los 5 ejes ideológicos</li>
                </ul>
                <p>
                  De esta forma priorizamos la coincidencia concreta en temas específicos, complementada con la cercanía ideológica general.
                </p>
              </section>

              <div className="final-message">
                <p>
                  Este sistema está diseñado para ser lo más objetivo y transparente posible, 
                  reduciendo al mínimo cualquier sesgo externo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default Metodologia;