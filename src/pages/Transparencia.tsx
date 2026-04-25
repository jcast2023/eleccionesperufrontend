import React from 'react';

import './PageStyles.css';   

const Transparencia: React.FC = () => {
  return (
    <>
      <div className="page-container">
        <div className="content-wrapper">
          <div className="info-card">
            <h1>Transparencia</h1>
            
            <div className="card-content">
              <p className="intro">
                En VotaBienPe Perú creemos que la transparencia no es opcional cuando se trata de información electoral. 
                Hemos diseñado nuestros sistemas con una política de "libros abiertos".
              </p>

              <section>
                <h2>1. Independencia Absoluta</h2>
                <h3>Cero Financiamiento Político</h3>
                <p>
                  VotaBienPe Perú es un proyecto técnico cívico desarrollado de forma independiente. 
                  No recibimos financiamiento de ningún partido político, candidato, agencia gubernamental 
                  ni empresa privada interesada en los resultados electorales.
                </p>

                <h3>Imparcialidad Modular</h3>
                <p>
                  Los perfiles, resúmenes y porcentajes de afinidad se generan estrictamente a partir de 
                  los Planes de Gobierno Oficiales presentados ante el JNE.
                </p>
              </section>

              <section>
                <h2>2. Auditoría del Chatbot y "Party Isolation"</h2>
                <h3>Regla de Aislamiento de Partidos</h3>
                <p>
                  El chatbot está diseñado para ser incorruptible. Tiene prohibido tomar propuestas de otros partidos 
                  o inventar información. Si el plan de gobierno no menciona un tema, te lo dirá claramente.
                </p>
              </section>

              <section>
                <h2>3. Privacidad y Manejo de Datos</h2>
                <p>
                  No recopilamos ni almacenamos datos personales identificables. No es necesario registrarse.
                </p>
              </section>

              <section>
                <h2>4. Donaciones</h2>
                <p>Si deseas apoyar el mantenimiento de la plataforma, puedes hacerlo de forma voluntaria:</p>
                <div className="donation-box">
                  <p><strong>Yape:</strong> Julio Edson Castillo Ita</p>
                  
                </div>
                <p className="nota">Cualquier aporte es opcional y no afecta el uso de la plataforma.</p>
              </section>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Transparencia;