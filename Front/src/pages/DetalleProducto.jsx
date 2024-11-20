import React, { useState, useEffect } from "react";
import styles from "../styles/DetalleProducto.module.css";
import { useNavigate, useParams } from "react-router-dom";
import obtenerNombreCategoria from "../../utils/filtrarCategoria";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`);
        if (response.ok) {
          const { producto } = await response.json();
          setProducto(producto);
        } else {
          console.error("Error al obtener el producto:", response.status);
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    };

    const getCategorias = async () => {
      try {
        const resultado = await fetch("http://localhost:3000/categorias");
        const data = await resultado.json();

        setCategorias(data.categorias[0]);
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
        alert("No se pudo obtener las categorias");
      }
    };

    getProducto();
    getCategorias();
  }, [id]);

  const handleEdit = () => {
    navigate(`/productos/${id}/editar`);
  };

  const categoriaFiltrada = categorias.find(
    (categoria) => categoria.id_categoria === id
  );

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Consultar Producto</h2>
      {producto ? (
        <>
          <div className={styles.viewGroup}>
            <label>ID Producto:</label>
            <div>{producto.id_producto}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Nombre del Producto:</label>
            <div>{producto.nombre_producto}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Stock Actual:</label>
            <div>{producto.stock_actual}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Precio de Lista:</label>
            <div>${producto.precio_lista}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Descuento 1:</label>
            <div>${producto.descuento_uno}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Descuento 2:</label>
            <div>${producto.descuento_dos}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Incremento:</label>
            <div>${producto.incremento}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Precio Final:</label>
            <div>${producto.precio_final}</div>
          </div>
          <div className={styles.viewGroup}>
            <label>Categoría:</label>
            <div>
              {categorias && categoriaFiltrada && categoriaFiltrada.descripcion}
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancelar
          </button>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={handleEdit}
          >
            Editar
          </button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default DetalleProducto;
