import React from 'react';
import Formulario from '../components/Formulario';
import styles from '../styles/DetalleProducto.module.css';

const AgregarProducto = ({ guardarProducto }) => {
  const handleSave = (productData) => {
    guardarProducto(productData);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Agregar Producto Nuevo</h2>
      <Formulario onSave={handleSave} onCancel={() => window.history.back()}  />
    </div>
  );
};

export default AgregarProducto;