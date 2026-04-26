import React, { useState } from 'react';
import './ContactForm.css';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:8080/api';

  const [enviando, setEnviando] =
    useState(false);

  const [formData, setFormData] =
    useState({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });

  const [errores, setErrores] =
    useState({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });

  const soloLetras =
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

  const correoValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });

    setErrores({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    };

    let valido = true;

    // Nombre opcional
    if (
      formData.nombre.trim() !== '' &&
      !soloLetras.test(
        formData.nombre.trim()
      )
    ) {
      nuevosErrores.nombre =
        'Solo letras.';
      valido = false;
    }

    // Email obligatorio
    if (
      formData.email.trim() === ''
    ) {
      nuevosErrores.email =
        'Correo obligatorio.';
      valido = false;

    } else if (
      !correoValido.test(
        formData.email.trim()
      )
    ) {
      nuevosErrores.email =
        'Correo inválido.';
      valido = false;
    }

    // Asunto obligatorio
    if (
      formData.asunto.trim() === ''
    ) {
      nuevosErrores.asunto =
        'Asunto obligatorio.';
      valido = false;

    } else if (
      formData.asunto.trim()
        .length < 4
    ) {
      nuevosErrores.asunto =
        'Mínimo 4 caracteres.';
      valido = false;
    }

    // Mensaje obligatorio
    if (
      formData.mensaje.trim() === ''
    ) {
      nuevosErrores.mensaje =
        'Mensaje obligatorio.';
      valido = false;

    } else if (
      formData.mensaje.trim()
        .length < 10
    ) {
      nuevosErrores.mensaje =
        'Mínimo 10 caracteres.';
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
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } =
      e.target;

    let nuevoValor = value;

    // Nombre solo letras
    if (name === 'nombre') {
      nuevoValor =
        value.replace(
          /[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g,
          ''
        );
    }

    setFormData({
      ...formData,
      [name]: nuevoValor
    });

    setErrores({
      ...errores,
      [name]: ''
    });
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!validarFormulario()) {
    toast.error(
      'Complete correctamente los campos'
    );
    return;
  }

  setEnviando(true);

  try {
    const inicio = Date.now();

    const response = await fetch(
      `${API_URL}/contacto`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json'
        },
        body: JSON.stringify(
          formData
        )
      }
    );

    // mínimo 1 segundo spinner
    const tiempo =
      Date.now() - inicio;

    if (tiempo < 1000) {
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1000 - tiempo
          )
      );
    }

    if (response.ok) {
      toast.success(
        '¡Mensaje enviado correctamente!'
      );

      limpiarFormulario();

      setTimeout(() => {
        onClose();
      }, 1800);

    } else {
      toast.error(
        'Error al enviar mensaje'
      );
    }

  } catch {
    toast.error(
      'No se pudo conectar con el servidor'
    );

  } finally {
    setEnviando(false);
  }
};

  return (
    <>
      <div
        className="contact-modal"
        onClick={onClose}
      >
        <div
          className="contact-card"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <button
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>

          <div className="contact-header">
            <h2>
              Contacto
            </h2>

            <p>
              Si tienes dudas o
              sugerencias,
              envíanos un
              mensaje.
            </p>
          </div>

          <div className="card-body">
            <form
              onSubmit={
                handleSubmit
              }
              noValidate
            >

              {/* Nombre */}
              <div className="form-group">
                <label>
                  Nombre
                  (opcional)
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

                {errores.nombre && (
                  <small className="error">
                    {
                      errores.nombre
                    }
                  </small>
                )}
              </div>

              {/* Email */}
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

              {/* Asunto */}
              <div className="form-group">
                <label>
                  Asunto *
                </label>

                <input
                  type="text"
                  name="asunto"
                  value={
                    formData.asunto
                  }
                  onChange={
                    handleChange
                  }
                />

                {errores.asunto && (
                  <small className="error">
                    {
                      errores.asunto
                    }
                  </small>
                )}
              </div>

              {/* Mensaje */}
              <div className="form-group">
                <label>
                  Mensaje *
                </label>

                <textarea
                  rows={4}
                  name="mensaje"
                  value={
                    formData.mensaje
                  }
                  onChange={
                    handleChange
                  }
                />

                {errores.mensaje && (
                  <small className="error">
                    {
                      errores.mensaje
                    }
                  </small>
                )}
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
                  'Enviar mensaje'
                )}
              </button>

            </form>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default ContactForm;
