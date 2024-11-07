import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Productos.css";
import Menu from "../components/Menu";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [sort, setSort] = useState("nombre_producto");
  const [order, setOrder] = useState("DESC");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const resultado = await fetch(
          `http://localhost:3000/productos?offset=0&limit=10&sort=${sort}&order=${order}&search=${terminoBusqueda}`
        );
        const data = await resultado.json();
        console.log("Data: ", data);
        setProductos(data.productos);
        setProductosOriginales(data.productos);
      } catch (error) {
        alert("No se pudo obtener los productos");
      }
    };

    traerProductos();
  }, [sort, order]);

  useEffect(() => {
    const productosFiltrados = productosOriginales.filter((producto) =>
      producto.nombre_producto.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setProductos(productosFiltrados);
  }, [terminoBusqueda, productosOriginales]);

  const handleVerDetalles = (id) => {
    alert(`aca tengo que ver la pagina de detalle:${id}`);
  };

  const handleBorrar = (id) => {
    alert(`Borrar producto con ID: ${id}`);
  };

  const handleAgregar = () => {
    navigate("/agregar_producto");
  };

  const handleSort = (columnaClickeada) => {
    if (sort === columnaClickeada) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSort(columnaClickeada);
      setOrder("ASC");
    }
  };

  const mostrarFlecha = (columnaClickeada) => {
    if (sort === columnaClickeada) {
      return order === "ASC" ? "🔼" : "🔽";
    }
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
              <th onClick={() => handleSort("nombre_producto")}>
                Nombre Producto {mostrarFlecha("nombre_producto")}
              </th>
              <th onClick={() => handleSort("precio_lista")}>
                Precio de Lista {mostrarFlecha("precio_lista")}
              </th>
              <th onClick={() => handleSort("precio_final")}>
                Precio de Venta {mostrarFlecha("precio_final")}
              </th>
              <th onClick={() => handleSort("stock_actual")}>
                Stock {mostrarFlecha("stock_actual")}
              </th>
              <th onClick={() => handleSort("categoria")}>
                Categoria {mostrarFlecha("categoria")}
              </th>
            </tr>
            <tr>
              <th></th>
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
