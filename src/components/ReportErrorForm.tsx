import React, { useState } from 'react';
import './ContactForm.css';

interface ReportErrorProps {
  onClose: () => void;
}

const ReportErrorForm: React.FC<ReportErrorProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    relacion: '',
    tipoReporte: '',
    partido: '',
    seccion: '',
    descripcion: ''
  });

  // Centralización de la API con Vite
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usamos la variable de entorno para el endpoint de reportes
      const response = await fetch(`${API_URL}/reportes`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("¡Reporte enviado con éxito! Gracias por ayudarnos a mejorar.");
        onClose();
      } else {
        alert("Hubo un error al enviar el reporte. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("No se pudo conectar con el servidor. Verifica que el backend esté activo.");
    }
  };

  const partidos = [
    "Alianza para el Progreso", "Fuerza Popular", "Renovación Popular", "Avanza País", 
    "Juntos por el Perú", "Podemos Perú", "Somos Perú", "Partido Morado", "Perú Libre", 
    "Partido Aprista Peruano", "Alianza Fuerza y Libertad", "Alianza Unidad Nacional", 
    "Alianza Venceremos", "Ahora Nación", "Partido Cívico Obras", "Cooperación Popular", 
    "Partido Demócrata Unido Perú", "Partido Demócrata Verde", "Perú Acción", 
    "Integridad Democrática", "Buen Gobierno", "PRIN", "Trabajadores y Emprendedores", 
    "Progresemos", "Patriótico del Perú", "Salvemos al Perú", "Sí Creo", "Perú Moderno", 
    "Libertad Popular", "Perú Primero", "Un Camino Diferente", "Frente de la Esperanza", 
    "Fe en el Perú", "País Para Todos", "Primero La Gente"
  ];

  return (
    <div className="contact-modal" onClick={onClose}>
      <div className="contact-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="contact-header">
          <h2>Reportar error o sugerencia</h2>
          <p>Si encuentras un error en la plataforma o deseas sugerir una corrección, puedes enviarlo aquí.</p>
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
              <label>Correo electrónico (opcional, recomendado)</label>
              <input 
                type="email" 
                name="email" 
                placeholder="correo@ejemplo.com" 
                value={formData.email}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Relación con el reporte</label>
              <select 
                name="relacion" 
                value={formData.relacion}
                onChange={handleChange} 
                required
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Usuario">Usuario</option>
                <option value="Representante de partido">Representante de partido</option>
                <option value="Investigador / periodista">Investigador / periodista</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de reporte</label>
              <select 
                name="tipoReporte" 
                value={formData.tipoReporte}
                onChange={handleChange} 
                required
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Error general">Error general</option>
                <option value="Respuesta del test incorrecta">Respuesta del test incorrecta</option>
                <option value="Problema en resumen de plan de gobierno">Problema en resumen de plan de gobierno</option>
                <option value="Problema en chatbot">Problema en chatbot</option>
                <option value="Información incompleta">Información incompleta</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Partido relacionado (opcional)</label>
              <select 
                name="partido" 
                value={formData.partido}
                onChange={handleChange}
              >
                <option value="">Selecciona un partido (si aplica)</option>
                {partidos.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Pregunta o sección relacionada (opcional)</label>
              <input 
                type="text" 
                name="seccion" 
                placeholder="Ej: Sección de economía"
                value={formData.seccion}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Descripción del reporte *</label>
              <textarea 
                name="descripcion" 
                placeholder="Si es posible, incluye contexto, referencias o citas del plan de gobierno." 
                rows={4} 
                required 
                value={formData.descripcion}
                onChange={handleChange} 
              />
            </div>

            <button type="submit" className="btn-enviar">Enviar reporte</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportErrorForm;