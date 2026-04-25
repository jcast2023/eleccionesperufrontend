import React from 'react';
import './ContactForm.css'; // Reutilizamos los estilos de modal que ya tienes

interface DonationModalProps {
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose }) => {
  return (
    <div className="contact-modal" onClick={onClose}>
      <div className="contact-card donation-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="contact-header">
          <h2>Apoya este proyecto</h2>
          <p>
            TuVoto Perú es un proyecto independiente. Si esta plataforma te resulta útil, 
            puedes apoyar el mantenimiento de la base de datos y desarrollo.
          </p>
        </div>

        <div className="card-body donation-body">
          <div className="donation-section">
            <h3>Perú</h3>
            <div className="yape-container">
                {/* La ruta "/" apunta directamente a la carpeta public */}
                <img 
                src="/qr-yape.jpg" 
                alt="Código QR Yape para donaciones" 
                className="qr-image" 
                />
            </div>
        </div>


          <p className="donation-footer-text">
            Las donaciones ayudan a cubrir costos de infraestructura, APIs y mantenimiento del proyecto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;