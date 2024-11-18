import React from "react";
import { Routes, Route } from "react-router-dom";
import Ventas from "./pages/Ventas";
import Productos from "./pages/Productos";
import AgregarProducto from "./pages/AgregarProducto";
import DetalleProducto from "./pages/DetalleProducto";
import EditarProducto from "./pages/EditarProducto";
import Layout from "./components/Layout";
import VentanaPrincipal from "./pages/VentanaPrincipal";
import DetalleVentas from "./pages/DetalleVentas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<VentanaPrincipal />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/agregar" element={<AgregarProducto />} />
        <Route path="productos/:id" element={<DetalleProducto />} />
        <Route path="productos/:id/editar" element={<EditarProducto />} />
        <Route path="/ventas/:id" element={<DetalleVentas />} />
      </Route>
    </Routes>
  );
}

export default App;
