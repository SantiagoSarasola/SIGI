import React from 'react';
import Formulario from '../components/Formulario';
import styles from '../styles/DetalleProducto.module.css';

const EditarProducto = ({ product,  actualizar }) => {
  const handleSave = (updatedProduct) => {
    actualizar(updatedProduct);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Editar Producto</h2>
      <Formulario product={product} onSave={handleSave} onCancel={() => window.history.back()} isEditMode={true} />
    </div>
  );
};

export default EditarProducto;