import React from 'react';
import Menu from '../components/Menu';
import '../styles/Productos.css';

function Productos() {
  return (
    <div className="productos">
      <Menu />
      <div className="contenido">
        <h2>Productos</h2>
        <p>Ventana de Productos.</p>
      </div>
    </div>
  );
}

export default Productos;