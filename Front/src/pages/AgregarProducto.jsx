import React from 'react';
import Formulario from '../components/Formulario';
import styles from '../styles/DetalleProducto.module.css';

const AgregarProducto = () => {
  

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Agregar Producto Nuevo</h2>
      <Formulario />
    </div>
  );
};

export default AgregarProducto;