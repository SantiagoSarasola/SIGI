import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Productos.css";
import Menu from "../components/Menu";
import Paginacion from "../components/Paginacion";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [sort, setSort] = useState("nombre_producto");
  const [order, setOrder] = useState("DESC");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const navigate = useNavigate();
  const [paginaActual, setPaginaActual] = useState(1);
  const [limite, setLimite] = useState(10);
  const [totalProductos, setTotalProductos] = useState(0);

  const totalPaginas = Math.ceil(totalProductos / limite);
  const registrosInicio =
    totalProductos > 0 ? (paginaActual - 1) * limite + 1 : 0;
  const registrosFin =
    totalProductos > 0 ? Math.min(paginaActual * limite, totalProductos) : 0;

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const resultado = await fetch(
          `http://localhost:3000/productos?offset=${
            (paginaActual - 1) * limite
          }&limit=${limite}&sort=${sort}&order=${order}&search=${terminoBusqueda}`
        );
        const data = await resultado.json();

        setProductos(data.productos); // Actualiza los productos visibles
        setTotalProductos(data.paginacion.total || 0); // Actualiza el total de productos desde el backend
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("No se pudo obtener los productos");
      }
    };

    traerProductos();
  }, [paginaActual, limite, sort, order, terminoBusqueda]);

  // Filtrar productos por búsqueda
  // useEffect(() => {
  //   const productosFiltrados = productosOriginales.filter((producto) =>
  //     producto.nombre_producto
  //       .toLowerCase()
  //       .includes(terminoBusqueda.toLowerCase())
  //   );
  //   setProductos(productosFiltrados);
  // }, [terminoBusqueda, productosOriginales]);

  const handleVerDetalles = (id) => {
    navigate(`/productos/${id}`);
  };

  const handleBorrar = async (id) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto con ID: ${id}?`
    );
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (respuesta.ok) {
        const resultado = await respuesta.json();
        alert(`Producto con ID ${resultado.id} eliminado correctamente`);

        // Actualizar la lista de productos localmente
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.id_producto !== id)
        );
        // setProductosOriginales((prevProductos) =>
        //   prevProductos.filter((producto) => producto.id_producto !== id)
        // );
      } else {
        const error = await respuesta.json();
        alert(
          `No se pudo eliminar el producto: ${
            error.error || "Error desconocido"
          }`
        );
      }
    } catch (error) {
      console.error("Error al intentar eliminar el producto:", error);
      alert("Error al intentar eliminar el producto");
    }
  };

  const handleAgregar = () => {
    navigate("/productos/agregar");
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

        {/* Componente de Paginación */}
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onPaginaChange={(nuevaPagina) => setPaginaActual(nuevaPagina)}
          registrosVisibles={`Registros ${registrosInicio}-${registrosFin} de ${totalProductos}`}
        />

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
