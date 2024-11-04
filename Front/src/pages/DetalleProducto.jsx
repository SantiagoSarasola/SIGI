import React from 'react';
import styles from '../Styles/ProductPage.module.css';
import { useNavigate } from 'react-router-dom';

//Ejemplo producto
const productoEjemplo = {
    id: '001',
    nombre: 'Alimento Premium para Perros',
    stock: 50,
    precioLista: 500,
    descuentoUno: 10,
    costoIntermedio: 450,
    descuentoDos: 5,
    costoFinal: 427.5,
    incremento: 20,
    precioSugerido: 600,
    precioFinal: 512.5,
    ganancia: 85,
    categoria: 'Alimentos para Perros',
    fabrica: 'Nutripet'
  };


const DetalleProducto = ({ product = productoEjemplo }) => {

    const navigate = useNavigate(); 
    
    const handleEdit = () => {
        navigate(`./editar_producto/${product.id}`); 
    }
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Consultar Producto</h2>
      <div className={styles.viewGroup}>
        <label>ID Producto:</label>
        <div>{product.id}</div>
      </div>
      <div className={styles.viewGroup}>
        <label>Nombre del Producto:</label>
        <div>{product.nombre}</div>
      </div>
      <div className={styles.viewGroup}>
        <label>Stock:</label>
        <div>{product.stock}</div>
      </div>
      <div className={styles.viewGroup}>
        <label>Precio de Lista:</label>
        <div>${product.precioLista}</div>
      </div>
      <div className={styles.viewGroup}>
        <label>Categoría:</label>
        <div>{product.categoria}</div>
      </div>
      <div className={styles.viewGroup}>
        <label>Fábrica:</label>
        <div>{product.fabrica}</div>
      </div>
      <button onClick={() => {
        window.history.back()
        alert("Se cancelo la operacion!")}} className={`${styles.button} ${styles.cancelButton}`}>Cancelar</button>
      <button className={`${styles.button} ${styles.saveButton}`} onClick={handleEdit}>Editar</button>
    </div>
  );
};


export default DetalleProducto;
