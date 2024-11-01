import React, { useState, useEffect } from 'react';
import '../styles/Productos.css';
import Menu from '../components/Menu';

function Productos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const traerProductos = async() => {
      try {
        const resultado = await fetch("http://localhost:3000/productos")
        const data = await resultado.json()
        setProductos(data.productos[0])
        console.log(data.productos[0])
      } catch (error) {
        alert("no funca")
      }
    }
    
    traerProductos()
    
  }, [])
  

  const handleVerDetalles = (id) => {
    alert(`voy a la ventana para ver los detalles del producto: ${id}`);
  };

  const handleBorrar = (id) => {
    alert(`Borrar producto con ID: ${id}`);
  };

  const handleAgregar = () => {
    alert(`Aca tengo que ir a la ventana de añadir`);
  };

  return (
    <>
      <div>
        <Menu />
      </div>
    <div className="productos">
        <div className="header-productos">
          <h2>Productos</h2>
          <button className="btn-nuevo" onClick={() => handleAgregar()}>Añadir Nuevo</button>
        </div>
      <table className="productos-tabla">
        <thead>
          <tr>
            <th>Buscar</th>
            <th>ID Prod.</th>
            <th>Nombre Producto</th>
            <th>Precio de Lista</th>
            <th>Precio de Venta</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos && productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>
                <button onClick={() => handleVerDetalles(producto.id_producto)}>🔍</button>
                <button onClick={() => handleBorrar(producto.id_producto)}>🗑️</button>
              </td>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>${producto.precio_lista}</td>
              <td>${producto.precio_final}</td>
              <td>{producto.stock_actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Productos;