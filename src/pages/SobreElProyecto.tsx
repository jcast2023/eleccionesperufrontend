import React from 'react';
import './PageStyles.css';

const SobreElProyecto: React.FC = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="info-card">
          <h1>Sobre el Proyecto</h1>
          
          <div className="card-content">

            <section>
              <h2>Mi historia</h2>
              <p>
                Mi nombre es <strong>Julio Edson Castillo Ita</strong>. 
                Mi interés por la política comenzó durante las elecciones peruanas de 2021. 
                Ese proceso me hizo reflexionar profundamente sobre la situación institucional del país 
                y sobre la importancia de que los ciudadanos podamos votar con información real y entendiendo 
                lo que propone cada candidato.
              </p>
            </section>

            <section>
              <h2>El contexto del Perú</h2>
              <p>
                El Perú ha atravesado una etapa prolongada de inestabilidad política. En los últimos años 
                el país ha tenido una sucesión constante de presidentes, cuando en condiciones normales 
                deberían ser solo dos en un período de diez años. Además, desde 1985, varios expresidentes 
                han terminado enfrentando procesos judiciales por corrupción.
              </p>
              <p>
                Esta realidad me hizo entender que elegir y votar informadamente no es un tema menor, 
                sino una responsabilidad enorme, especialmente en un país donde el voto es obligatorio.
              </p>
            </section>

            <section>
              <h2>¿Por qué nace VotaBienPe Perú?</h2>
              <p>
                Decidí desarrollar VotaBienPe Perú como un aporte desde la tecnología para mejorar la forma 
                en que accedemos a la información electoral. Mi intención no es promover ninguna ideología 
                ni favorecer a ningún partido político. La idea es ofrecer una herramienta neutral que permita 
                a cualquier ciudadano analizar propuestas, comparar planes de gobierno y evaluar qué opciones 
                se acercan más a sus propias ideas.
              </p>
            </section>

            <section>
              <h2>El problema que enfrentamos</h2>
              <p>
                Cada proceso electoral en el Perú presenta un gran desafío: existe una gran cantidad de partidos 
                políticos (actualmente 35 inscritos), cada uno con documentos programáticos que pueden sumar 
                cientos de páginas. La mayoría de ciudadanos no tiene el tiempo ni las herramientas para revisar 
                todos esos documentos antes de votar.
              </p>
              <p>
                Como resultado, muchas decisiones electorales terminan basándose en percepciones superficiales, 
                campañas mediáticas o información incompleta.
              </p>
            </section>

            <section>
              <h2>Qué es VotaBienPe Perú</h2>
              <p>
                VotaBienPe Perú es una plataforma cívica e independiente creada para facilitar el acceso a 
                información electoral de cara a las Elecciones Presidenciales y Congresales de 2026.
              </p>
              <p>
                La plataforma analiza y organiza los planes de gobierno oficiales presentados ante el 
                Jurado Nacional de Elecciones (JNE) para ayudar a los ciudadanos a entender qué propone 
                cada partido y cómo se diferencian entre sí.
              </p>
              <p>
                <strong>El objetivo no es decirle a nadie por quién votar.</strong> 
                Buscamos dar herramientas para que cada ciudadano pueda tomar su propia decisión con mejor información.
              </p>
            </section>

            <section className="tools-section">
              <h2>Qué herramientas ofrece la plataforma</h2>
              <p className="section-intro">
                Para facilitar el análisis de las propuestas políticas, la plataforma incluye varias herramientas:
              </p>

              <div className="tools-grid">
                <div className="tool-item">
                  <h3>📘 Resúmenes de planes de gobierno</h3>
                  <p>Los documentos oficiales son procesados para generar resúmenes estructurados que permiten entender rápidamente las principales propuestas de cada partido.</p>
                </div>

                <div className="tool-item">
                  <h3>📊 Test de afinidad electoral</h3>
                  <p>El usuario responde una serie de preguntas sobre temas clave del contexto nacional. El sistema compara esas respuestas con las posiciones identificadas en los planes de gobierno y calcula un nivel de afinidad con cada partido.</p>
                </div>

                <div className="tool-item">
                  <h3>⚖️ Comparación ideológica</h3>
                  <p>Los partidos se ubican en distintos ejes temáticos basados en el contenido de sus propuestas, lo que permite visualizar diferencias programáticas entre ellos.</p>
                </div>

                <div className="tool-item">
                  <h3>🤖 Chatbot ciudadano</h3>
                  <p>La plataforma incluye un asistente conversacional que permite hacer preguntas directamente sobre los planes de gobierno y recibir respuestas basadas en el contenido de esos documentos.</p>
                </div>
              </div>
            </section>

            <div className="final-note">
              <p>
                VotaBienPe Perú es un proyecto independiente de tecnología cívica. 
                No pertenece a ningún partido político ni recibe financiamiento de organizaciones vinculadas a campañas electorales.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreElProyecto;