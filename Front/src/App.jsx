import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VentanaPrincipal from './pages/VentanaPrincipal';
import Ventas from './pages/Ventas';
import Productos from './pages/Productos';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VentanaPrincipal />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;
