import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AgregarProductoVentas.css";

function AgregarProductoVentas() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/productos");

        if (!respuesta.ok) {
          const errorData = await respuesta.json();
          throw new Error(`Error ${respuesta.status}: ${errorData.error}`);
        }

        const data = await respuesta.json();
        setProductos(data.productos);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("No se pudieron cargar los productos.");
      }
    };

    obtenerProductos();
  }, []);

  const handleSeleccionarProducto = (idProducto) => {
    const producto = productos.find(
      (prod) => prod.id_producto === parseInt(idProducto)
    );
    setProductoSeleccionado(producto);
  };

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    setCantidad(nuevaCantidad > 0 ? nuevaCantidad : 1);
  };

  const handleGuardar = () => {
    // Este handleGuardar tiene que agregar el producto en la base de datos ventas_productos
  };

  return (
    <div className="pagina-completa">
      <div className="detalle-ventas">
        <h2>Detalle de Venta #</h2>
        <p>
          <strong>Fecha:</strong>{" "}
        </p>
        <p>
          <strong>Total de Venta:</strong>
        </p>
        <div>
          <strong>Forma de Pago:</strong>
        </div>
        <p>
          <strong>Cantidad Total:</strong>
        </p>
        <table className="productos-tabla">
          <thead>
            <tr>
              <th></th>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>{/* cargar los productos que se van agregando  */}</tbody>
        </table>
      </div>

      <div className="agregar-producto">
        <h2>Agregar Producto a Venta</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label htmlFor="select-producto">Producto:</label>
          <select
            id="select-producto"
            onChange={(e) => handleSeleccionarProducto(e.target.value)}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre_producto}
              </option>
            ))}
          </select>
        </div>

        {productoSeleccionado && (
          <div className="producto-detalle">
            <h3>Detalles del Producto</h3>
            <p>
              <strong>ID:</strong> {productoSeleccionado.id_producto}
            </p>
            <p>
              <strong>Nombre:</strong> {productoSeleccionado.nombre_producto}
            </p>
            <p>
              <strong>Stock Actual:</strong> {productoSeleccionado.stock_actual}
            </p>
            <p>
              <strong>Precio Lista:</strong> $
              {productoSeleccionado.precio_lista}
            </p>
          </div>
        )}

        {productoSeleccionado && (
          <div className="form-group">
            <label htmlFor="input-cantidad">Cantidad:</label>
            <input
              id="input-cantidad"
              type="number"
              value={cantidad}
              onChange={handleCantidadChange}
              min="1"
            />
          </div>
        )}
        <div className="subtotal">
          <h3>Sub-Total: </h3>
        </div>
        <br />
        <button
          className="btn-guardar"
          disabled={!productoSeleccionado || cantidad <= 0}
          onClick={handleGuardar}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default AgregarProductoVentas;
