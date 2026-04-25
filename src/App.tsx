import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. IMPORTA LOS COMPONENTES DE ESTRUCTURA
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

// 2. IMPORTA TODAS LAS PÁGINAS (Aquí es donde fallaban los 7 errores)
import Home from "./pages/Home";
import Encuesta from "./pages/Encuesta";
import Comparar from "./pages/Comparar";
import Resumenes from "./pages/Resumenes";
import ResumenDetalle from "./pages/ResumenDetalle";
import Chatbot from "./pages/Chatbot";
import Metodologia from "./pages/Metodologia";
import Transparencia from "./pages/Transparencia";
import SobreElProyecto from "./pages/SobreElProyecto";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar fuera de Routes para que sea global */}
      <Navbar />

      <Routes>
        {/* Usamos Layout como ruta padre */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Encuesta />} />
          <Route path="comparar" element={<Comparar />} />
          <Route path="resumenes" element={<Resumenes />} />
          <Route path="resumenes/:id" element={<ResumenDetalle />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="metodologia" element={<Metodologia />} />
          <Route path="transparencia" element={<Transparencia />} />
          <Route path="sobre-el-proyecto" element={<SobreElProyecto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;