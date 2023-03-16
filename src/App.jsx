import Inicio from "./pages/Inicio";
import Layout from "./components/Layout";
import CargarArchivo from "./pages/CargarArchivo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lista from "./pages/Lista";

function App() {
  return (
    <Router>
      <Layout></Layout>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/cargar-archivo" element={<CargarArchivo />} />
        <Route path="/lista" element={<Lista />} />
      </Routes>
    </Router>
  );
}

export default App;
