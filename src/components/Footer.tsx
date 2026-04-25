import { Link } from "react-router-dom";
import "./Footer.css";

interface FooterProps {
  onContactClick: () => void;
  onReportClick: () => void;
  onDonationClick: () => void;
}

export default function Footer({ onContactClick, onReportClick, onDonationClick }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-main-container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Plataforma</h4>
            <Link to="/test">Test de Afinidad</Link>
            <Link to="/chatbot">Chatbot Electoral</Link>
            <Link to="/resumenes">Resúmenes de Planes</Link>
            <Link to="/comparar">Comparar Candidatos</Link>
          </div>

          <div className="footer-column">
            <h4>Proyecto</h4>
            <Link to="/metodologia">Metodología</Link>
            <Link to="/transparencia">Transparencia</Link>
            <Link to="/sobre-el-proyecto">Sobre el Proyecto</Link>
          </div>

          <div className="footer-column">
            <h4>Legal / Ayuda</h4>
            <button onClick={onContactClick} className="footer-link-btn">
              Contacto
            </button>
            <button onClick={onDonationClick} className="footer-link-btn">
              Donaciones
            </button>
            <button onClick={onReportClick} className="footer-link-btn">
              Reportar error
            </button>
          </div>
        </div>

        {/* LOGO A LA DERECHA QUE ENVÍA AL HOME */}
        <div className="footer-logo-section">
          <Link to="/" className="navbar-brand-imagotipo">
          <img 
            src="/logo.png" 
            alt="VotaBienPe - Vota con confianza" 
            className="imagotipo-img" 
          />
          <span className="imagotipo-text">
            VOTABIEN<span className="pe-badge">PE</span>
          </span>
        </Link>
          
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 VotaBienPe — Plataforma Electoral Independiente</p>
        <p>Esta plataforma facilita el acceso ciudadano a la información oficial de los planes de gobierno.</p>
      </div>
    </footer>
  );
}