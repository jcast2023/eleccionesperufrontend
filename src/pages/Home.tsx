import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">

      {/* HERO PRINCIPAL - Más impactante */}
      <section className="hero-main">
        <div className="hero-overlay"></div> {/* Capa para oscurecer un poco el fondo */}
        
        <div className="hero-container">
          {/* Lado Izquierdo: La imagen (Urna/Bandera) */}
          <div className="hero-image-box">
             <img src="VotaBienPeBanner.png" alt="Vota Bien Pe" className="floating-img" />
          </div>

          {/* Lado Derecho: El contenido con efecto cristal */}
          <div className="hero-glass-card">
            <h1>
              Conoce las propuestas reales.<br />
              Compara sin filtros.<br />
              <span className="highlight-blue">Vota con confianza.</span>
            </h1>
            
            <div className="description-container">
              <p className="hero-description">
                La plataforma que te ayuda a entender qué propone realmente cada candidato 
                y cuál se acerca más a lo que tú quieres para el Perú.
              </p>
            </div>

            <div className="hero-buttons">
              <Link to="/test" className="btn-primary-glow">
                <span>🗳️</span> Hacer el Test de Afinidad
              </Link>
              <Link to="/resumenes" className="btn-outline-white">
                <span>📄</span> Explorar Planes de Gobierno
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE HERRAMIENTAS */}
      <section className="tools-section">
        <div className="section-header">
          <h2>Todo lo que necesitas para decidir mejor</h2>
          <p>Herramientas simples y poderosas para entender la oferta electoral</p>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">🤖</div>
            <h3>Chatbot Electoral</h3>
            <p> Pregunta lo que quieras sobre los planes de gobierno y obtén respuestas claras basadas en documentos oficiales.</p>
            <Link to="/chatbot" className="tool-link">Probar Chatbot →</Link>
          </div>

          <div className="tool-card">
            <div className="tool-icon">📋</div>
            <h3>Resúmenes Claros</h3>
            <p>Lee los planes de gobierno de forma organizada y por temas importantes, sin tener que leer cientos de páginas.</p>
            <Link to="/resumenes" className="tool-link">Ver Resúmenes →</Link>
          </div>

          <div className="tool-card">
            <div className="tool-icon">🎯</div>
            <h3>Test de Afinidad</h3>
            <p>Responde 12 preguntas sobre temas reales del país y descubre qué candidatos están más cerca de tus ideas.</p>
            <Link to="/test" className="tool-link">Hacer el Test →</Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="how-it-works">
        <h2>Así de simple es usar la plataforma</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Responde el test</h3>
            <p>12 preguntas sobre los temas que realmente importan en el Perú actual.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Descubre tu perfil</h3>
            <p>Te mostramos con qué candidatos y partidos coincides más.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Compara y decide</h3>
            <p>Analiza propuestas, lee resúmenes y haz preguntas al chatbot.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN FINAL - Llamado a la acción */}
      <section className="final-cta">
        <div className="cta-card">
          <h2>¿Listo para votar más informado?</h2>
          <p>Únete a miles de peruanos que ya están usando VotaBienPe Perú para tomar una decisión consciente.</p>
          
          <div className="cta-buttons">
            <Link to="/test" className="btn-primary-large">
              Comenzar ahora
            </Link>
            <Link to="/resumenes" className="btn-outline">
              Ver todos los planes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}