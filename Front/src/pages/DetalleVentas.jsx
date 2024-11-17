import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DetalleVentas.css";

function DetalleVentas() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [venta, setVenta] = useState(null); 
  const [productos, setProductos] = useState([]); 
  const [error, setError] = useState(""); 

  
  useEffect(() => {
    const obtenerDetalleVenta = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3000/ventas/${id}/ventas_producto`);

        if (!respuesta.ok) {
          const errorData = await respuesta.json();
          throw new Error(`Error ${respuesta.status}: ${errorData.error}`);
        }

        const data = await respuesta.json();
        setVenta(data.ventaYProductos);
        setProductos(data.ventaYProductos.productos);
      } catch (error) {
        console.error("Error al obtener los detalles de la venta:", error);
        setError("No se pudo cargar la información de la venta.");
      }
    };

    obtenerDetalleVenta();
  }, [id]);

 
  const handleVolver = () => {
    navigate("/ventas");
  };

  return (
    <div className="detalle-ventas">
      {error && <p className="error">{error}</p>}
      {venta ? (
        <>
          <h2>Detalle de Venta #{venta.idVenta}</h2>
          <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleDateString("es-ES")}</p>
          <p><strong>Total de Venta:</strong> ${venta.ventaTotal}</p>
          <p><strong>Forma de Pago:</strong> {venta.formaPago}</p>
          <p><strong>Cantidad Total:</strong> {venta.cantidadTotal}</p>

          <h3>Productos</h3>
          <table className="productos-tabla">
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.idProducto}>
                  <td>{producto.idProducto}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>${producto.precioLista}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.subTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn-volver" onClick={handleVolver}>
            Volver a Ventas
          </button>
        </>
      ) : (
        <p>Cargando detalles de la venta...</p>
      )}
    </div>
  );
}

export default DetalleVentas;
