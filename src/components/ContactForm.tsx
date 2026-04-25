import React, { useState } from 'react';
import './ContactForm.css';



interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar los datos al Backend en Java (Spring Boot)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
   console.log("URL detectada por Vite:", apiUrl);
    try {
      const response = await fetch(`${apiUrl}/contacto`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });


      if (response.ok) {
        alert("¡Mensaje enviado correctamente! Guardado en la base de datos.");
        onClose();
      } else {
        alert("Error en el servidor al procesar el mensaje.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el servidor. Verifica que el backend esté corriendo.");
    }
  };

  return (
    <div className="contact-modal" onClick={onClose}>
      <div className="contact-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="contact-header">
          <h2>Contacto</h2>
          <p>Si tienes preguntas o sugerencias respecto al proyecto, envíanos un mensaje.</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre (opcional)</label>
              <input 
                type="text" 
                name="nombre" 
                placeholder="Tu nombre" 
                value={formData.nombre}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico *</label>
              <input 
                type="email" 
                name="email" 
                placeholder="correo@ejemplo.com" 
                required 
                value={formData.email}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Asunto *</label>
              <input 
                type="text" 
                name="asunto" 
                placeholder="Asunto del mensaje" 
                required 
                value={formData.asunto}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Mensaje *</label>
              <textarea 
                name="mensaje" 
                placeholder="Escribe tu mensaje..." 
                rows={4} 
                required 
                value={formData.mensaje}
                onChange={handleChange} 
              />
            </div>

            <button type="submit" className="btn-enviar">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;