import React from 'react';
import Formulario from '../components/Formulario';
import styles from '../styles/DetalleProducto.module.css';

const EditarProducto = () => {

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Editar Producto</h2>
      <Formulario  />
    </div>
  );
};

export default EditarProducto;