import React from "react";
import "../styles/Ventas.css";

function Ventas() {

  const handleAgregar = () => {
    alert("Agregar una venta nueva");
  };

  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="ventas">
        <div className="header-ventas">
          <h2>Ventas</h2>
          <button className="btn-nuevo" onClick={handleAgregar}>
            Añadir Venta
          </button>
        </div>

        
        {/* <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onPaginaChange={(nuevaPagina) => setPaginaActual(nuevaPagina)}
          registrosVisibles={`Registros ${registrosInicio}-${registrosFin} de ${totalProductos}`}
        /> */}

        <table className="ventas-tabla">
          <thead>
            <tr>
              <th></th>
              <th>ID Venta.</th>
              <th>
                Fecha
              </th>
              <th>
                Cantidad de Productos
              </th>
              <th>
                Total Venta
              </th>
              <th>
                Forma de Pago
              </th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>
                {/* <input
                  className="textBox"
                  type="text"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  placeholder="Buscar por nombre"
                /> */}
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>
                  <button
                    className="btn-detalles"
                    onClick={() => handleVerDetalles(producto.id_producto)}
                  >
                    🔍
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleBorrar(producto.id_producto)}
                  >
                    🗑️
                  </button>
                </td>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>${producto.precio_lista}</td>
                <td>${producto.precio_final}</td>
                <td>{producto.stock_actual}</td>
                <td>{producto.categoria}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Ventas;
