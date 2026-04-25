import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar fixed-top">
      <div className="navbar-container">
        {/* IMAGOTIPO COMPLETO (Símbolo + Texto) */}
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

        {/* Menú de Navegación (alineado a la derecha) */}
        <div className="menu">
          <Link to="/test" className="menu-link">Test</Link>
          <Link to="/chatbot" className="menu-link">Chatbot</Link>
          <Link to="/resumenes" className="menu-link">Resúmenes</Link>
          <Link to="/comparar" className="menu-link">Comparar</Link>
        </div>
      </div>
    </nav>
  );
}
