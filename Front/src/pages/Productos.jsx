import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Productos.css";
import Menu from "../components/Menu";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [sort, setSort] = useState("nombre_producto");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const resultado = await fetch(
          `http://localhost:3000/productos?offset=0&limit=10&sort=${sort}&order=DESC&search=${terminoBusqueda}`
        );
        const data = await resultado.json();
        console.log("Data: ", data);
        setProductos(data.productos);
      } catch (error) {
        alert("No se pudo obtener los productos");
      }
    };

    traerProductos();
  }, [sort, terminoBusqueda]);

  const handleVerDetalles = (id) => {
    alert(`aca tengo que ver la pagina de detalle:${id}`);
  };

  const handleBorrar = (id) => {
    alert(`Borrar producto con ID: ${id}`);
  };

  const handleAgregar = () => {
    navigate("/agregarproducto");
  };

  const handleBuscar = () => {
    // Al actualizar `terminoBusqueda`, `useEffect` se encargará de llamar a la API automáticamente.
    console.log("Buscando productos con el término:", terminoBusqueda);
  };

  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="productos">
        <div className="header-productos">
          <h2>Productos</h2>
          <button className="btn-nuevo" onClick={handleAgregar}>
            Añadir Nuevo
          </button>
        </div>
        <table className="productos-tabla">
          <thead>
            <tr>
              <th></th>
              <th>ID Prod.</th>
              <th onClick={() => setSort("nombre_producto")}>
                Nombre Producto
              </th>
              <th onClick={() => setSort("precio_lista")}>Precio de Lista</th>
              <th onClick={() => setSort("precio_final")}>Precio de Venta</th>
              <th onClick={() => setSort("stock_actual")}>Stock</th>
              <th onClick={() => setSort("categoria")}>Categoria</th>
            </tr>
            <tr>
              <th>
                <button className="btn-buscar" onClick={handleBuscar}>
                  Buscar
                </button>
              </th>
              <th></th>
              <th>
                <input
                  className="textBox"
                  type="text"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  placeholder="Buscar por nombre"
                />
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Productos;
