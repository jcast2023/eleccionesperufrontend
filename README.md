# VotaBienPe - Frontend 🖥️🗳️

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Interfaz de usuario moderna y responsiva diseñada para empoderar al ciudadano peruano. La plataforma permite interactuar con datos electorales complejos a través de una experiencia intuitiva, facilitando el voto informado mediante **Inteligencia Artificial** y visualización de datos de alto impacto.

---

## 🚀 Funcionalidades Clave

| Característica | Descripción y Detalle Técnico |
| :--- | :--- |
| **📝 Test de Alineamiento** | Interfaz dinámica de 12 preguntas que categoriza la postura del usuario en temas críticos. |
| **🤖 Chatbot Electoral** | Chat interactivo (`Chatbot.tsx`) que extrae respuestas exclusivas de los planes de gobierno. |
| **📈 Comparador Inteligente** | Herramienta visual que usa `RadarChartCompare.tsx` para mostrar porcentajes de coincidencia. |
| **🗂️ Dashboard de Candidatos** | Visualización de perfiles, resúmenes ejecutivos y acceso directo a planes de gobierno en PDF. |
| **🔍 Buscador Avanzado** | Filtros inteligentes por partido, región y antecedentes éticos. |
| **✉️ Centro de Feedback** | Formularios integrados para reporte de errores y contacto directo con el equipo. |

---

## 🛠️ Stack Tecnológico

* **Framework Core:** React 18 con Hooks para una gestión de estado eficiente.
* **Tipado:** TypeScript para garantizar un desarrollo robusto y escalable.
* **Build Tool:** Vite (Optimización de carga y HMR ultra rápido).
* **Estilos:** Tailwind CSS / Bootstrap para un diseño limpio, moderno y 100% adaptable (Responsive).
* **Gráficos:** Recharts / Chart.js para la representación de KPIs y el radar de comparación política.
* **Comunicación:** Axios / Fetch API conectado al backend en **Java 21 / Spring Boot**.

---

📂 Estructura del Proyecto
Plaintext
src/
 ├── 📂 assets/          # Recursos visuales (Imágenes, SVGs) y estilos globales.
 ├── 📂 components/      # Componentes modulares y reutilizables (Navbar, RadarChart).
 ├── 📂 pages/           # Vistas principales (Chatbot, Encuesta, Comparativa).
 ├── 📂 services/        # Capa de servicios para consumo de API (api.ts).
 ├── 📂 types/           # Definición de interfaces y tipos de TypeScript.
 └── 📂 utils/           # Funciones de ayuda y lógica de formateo.
⚙️ Configuración e Instalación
Sigue estos pasos para levantar el entorno de desarrollo localmente:

✅ Requisitos Previos
Node.js (Versión 18 o superior)

npm o yarn instalado

1️⃣ Variables de Entorno
Crea un archivo .env en la raíz de tu proyecto y configura la URL de tu API de Spring Boot:

Fragmento de código
VITE_API_URL=http://localhost:8080/api
2️⃣ Comandos de Ejecución
Abre una terminal en la carpeta del proyecto y ejecuta:

Bash
# Instalar todas las dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
[!TIP]
La aplicación estará disponible por defecto en: http://localhost:5173

🤝 Feedback y Transparencia
El proyecto incluye secciones dedicadas a la Transparencia, permitiendo a los usuarios reportar errores en la data electoral o sugerir mejoras técnicas. Creemos en la tecnología como herramienta de fiscalización ciudadana.

[!IMPORTANT]
Dependencia del Backend: Asegúrate de tener el repositorio vota-bien-pe-backend en ejecución para que el Test de Afinidad y el Chatbot puedan procesar los datos correctamente.
