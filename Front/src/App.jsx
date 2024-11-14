import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VentanaPrincipal from './pages/VentanaPrincipal';
import Ventas from './pages/Ventas';
import Productos from './pages/Productos';
import AgregarProducto from './pages/AgregarProducto';
import DetalleProducto from './pages/DetalleProducto';
import EditarProducto from './pages/EditarProducto';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VentanaPrincipal />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/agregar" element={<AgregarProducto />} />
        <Route path="/productos/:id" element={<DetalleProducto/>}  />
        <Route path="/productos/:id/editar" element={<EditarProducto />} />
      </Routes>
    </Router>
  );
}

export default App;
