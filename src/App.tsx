import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

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
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="test" element={<Encuesta />} />
            <Route path="comparar" element={<Comparar />} />
            <Route path="resumenes" element={<Resumenes />} />
            <Route path="resumenes/:id" element={<ResumenDetalle />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="metodologia" element={<Metodologia />} />
            <Route path="transparencia" element={<Transparencia />} />
            <Route
              path="sobre-el-proyecto"
              element={<SobreElProyecto />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnHover
      />
    </>
  );
}

export default App;
