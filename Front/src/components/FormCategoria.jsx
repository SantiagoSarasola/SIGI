// CategoriaForm.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Formulario.module.css';

const FormCategoria = ({ onSave, categoria, onCancel }) => {
  const [descripcion, setDescripcion] = useState(categoria ? categoria.descripcion : '');

  useEffect(() => {
    if (categoria) {
      setDescripcion(categoria.descripcion);
    }
  }, [categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(descripcion);
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label>{categoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
        <button type="submit" className={styles.saveButton}>
          {categoria ? 'Guardar Cambios' : 'Agregar Categoría'}
        </button>
      </div>
    </form>
  );
};

export default FormCategoria;
