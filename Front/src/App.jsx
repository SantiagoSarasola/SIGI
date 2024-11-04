import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VentanaPrincipal from './pages/VentanaPrincipal';
import Ventas from './pages/Ventas';
import Productos from './pages/Productos';
import AgregarProducto from './pages/AgregarProducto';
import DetalleProducto from './pages/DetalleProducto';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VentanaPrincipal />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/agregar_producto/" element={<AgregarProducto />} />
        <Route path="/editar_producto/:id" element={<EditarProducto />} />
        <Route path="/detalle_producto/:id" element={<DetalleProducto />} />
      </Routes>
    </Router>
  );
}

export default App;
