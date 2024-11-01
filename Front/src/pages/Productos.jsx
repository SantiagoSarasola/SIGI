import React from 'react';
import '../styles/Productos.css';
import Menu from '../components/Menu';

function Productos() {
  // Datos de ejemplo para el grid
  const productos = [
    { id: 1, descripcion: 'Detalle del producto 1', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 },
    { id: 2, descripcion: 'Detalle del producto 2', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 },
    { id: 3, descripcion: 'Detalle del producto 3', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 },
    { id: 4, descripcion: 'Detalle del producto 4', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 },
    { id: 5, descripcion: 'Detalle del producto 5', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 },
    { id: 6, descripcion: 'Detalle del producto 6', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 },
    { id: 7, descripcion: 'Detalle del producto 7', precioCosto: 1000.25, precioVenta: 1450.00, stock: 10 }
  ];

  const handleVerDetalles = (id) => {
    alert(`Ver detalles del producto con ID: ${id}`);
  };

  const handleBorrar = (id) => {
    alert(`Borrar producto con ID: ${id}`);
  };

  return (
    <>
      <div>
        <Menu />
      </div>
      
    
    <div className="productos">
      
      <h2>Productos</h2>
      <button className="btn-nuevo">Añadir Nuevo</button>
      <table className="productos-tabla">
        <thead>
          <tr>
            <th>Buscar</th>
            <th>ID Prod.</th>
            <th>Descripcion</th>
            <th>P. Costo</th>
            <th>P. Venta</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <button onClick={() => handleVerDetalles(producto.id)}>🔍</button>
                <button onClick={() => handleBorrar(producto.id)}>🗑️</button>
              </td>
              <td>{producto.id}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precioCosto.toFixed(2)}</td>
              <td>${producto.precioVenta.toFixed(2)}</td>
              <td>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Productos;