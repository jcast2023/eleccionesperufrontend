import React, { useState } from "react";
import "./ContactForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ReportErrorProps {
  onClose: () => void;
}

const ReportErrorForm: React.FC<ReportErrorProps> = ({ onClose }) => {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";

  const [enviando, setEnviando] =
    useState(false);

  const [formData, setFormData] =
    useState({
      nombre: "",
      email: "",
      relacion: "",
      tipoReporte: "",
      partido: "",
      seccion: "",
      descripcion: ""
    });

  const [errores, setErrores] =
    useState({
      email: "",
      relacion: "",
      tipoReporte: "",
      descripcion: ""
    });

  const partidos = [
    "Alianza para el Progreso",
    "Fuerza Popular",
    "Renovación Popular",
    "Avanza País",
    "Juntos por el Perú",
    "Podemos Perú",
    "Somos Perú",
    "Partido Morado",
    "Perú Libre"
  ];

  const correoValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      email: "",
      relacion: "",
      tipoReporte: "",
      partido: "",
      seccion: "",
      descripcion: ""
    });

    setErrores({
      email: "",
      relacion: "",
      tipoReporte: "",
      descripcion: ""
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {
      email: "",
      relacion: "",
      tipoReporte: "",
      descripcion: ""
    };

    let valido = true;

    if (
      formData.email.trim() === ""
    ) {
      nuevosErrores.email =
        "Correo obligatorio";
      valido = false;
    } else if (
      !correoValido.test(
        formData.email
      )
    ) {
      nuevosErrores.email =
        "Correo inválido";
      valido = false;
    }

    if (
      formData.relacion === ""
    ) {
      nuevosErrores.relacion =
        "Seleccione una opción";
      valido = false;
    }

    if (
      formData.tipoReporte === ""
    ) {
      nuevosErrores.tipoReporte =
        "Seleccione una opción";
      valido = false;
    }

    if (
      formData.descripcion
        .trim()
        .length < 15
    ) {
      nuevosErrores.descripcion =
        "Mínimo 15 caracteres";
      valido = false;
    }

    setErrores(
      nuevosErrores
    );

    return valido;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrores({
      ...errores,
      [name]: ""
    });
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!validarFormulario()) {
    toast.error(
      "Complete correctamente los campos"
    );
    return;
  }

  setEnviando(true);

  try {
    // fuerza mostrar spinner mínimo 1 segundo
    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1000)
    );

    const response =
      await fetch(
        `${API_URL}/reportes`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            formData
          )
        }
      );

    if (response.ok) {

      toast.success(
        "Reporte enviado correctamente"
      );

      limpiarFormulario();

      setTimeout(() => {
        onClose();
      }, 2500);

    } else {
      toast.error(
        "Error al enviar reporte"
      );
    }

  } catch {
    toast.error(
      "No se pudo conectar"
    );
  } finally {
    setEnviando(false);
  }
};


  return (
    <>
      <div className="contact-modal">
        <div
          className="contact-card glass"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

          <div className="contact-header">
            <h2>
              Reportar Error
            </h2>
            <p>
              Ayúdanos a mejorar
              la plataforma.
            </p>
          </div>

          <div className="card-body">
            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="form-group">
                <label>
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={
                    formData.nombre
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Correo *
                </label>
                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />
                {errores.email && (
                  <small className="error">
                    {
                      errores.email
                    }
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>
                  Relación *
                </label>
                <select
                  name="relacion"
                  value={
                    formData.relacion
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Seleccione
                  </option>
                  <option value="Usuario">
                    Usuario
                  </option>
                  <option value="Representante">
                    Representante
                  </option>
                  <option value="Investigador">
                    Investigador
                  </option>
                  <option value="Otro">
                    Otro
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Tipo *
                </label>
                <select
                  name="tipoReporte"
                  value={
                    formData.tipoReporte
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Seleccione
                  </option>
                  <option value="Error general">
                    Error general
                  </option>
                  <option value="Chatbot">
                    Chatbot
                  </option>
                  <option value="Resumen">
                    Resumen
                  </option>
                  <option value="Otro">
                    Otro
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Partido
                </label>
                <select
                  name="partido"
                  value={
                    formData.partido
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Seleccione
                  </option>

                  {partidos.map(
                    (p) => (
                      <option
                        key={p}
                        value={p}
                      >
                        {p}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>
                  Sección
                </label>
                <input
                  type="text"
                  name="seccion"
                  value={
                    formData.seccion
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Descripción *
                </label>
                <textarea
                  rows={4}
                  name="descripcion"
                  value={
                    formData.descripcion
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <button
                type="submit"
                className="btn-enviar"
                disabled={
                  enviando
                }
              >
                {enviando ? (
                  <>
                    <span className="spinner"></span>
                    Enviando...
                  </>
                ) : (
                  "Enviar Reporte"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
  position="top-center"
  autoClose={2200}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
  style={{
    zIndex: 999999
  }}
/>

    </>
  );
};

export default ReportErrorForm;
