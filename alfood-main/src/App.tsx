import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdmRestaurante from "./paginas/Adm/AdmRestaurante";
import FormularioRestaurante from "./paginas/Adm/FormularioRestaurante";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />
            <Route path="/adm/restaurante" element={<AdmRestaurante />} />
            <Route
                path="/adm/restaurante/novo"
                element={<FormularioRestaurante />}
            />
        </Routes>
    );
}

export default App;
