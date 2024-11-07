import { useState } from "react";
import styles from "../styles/Formulario.module.css";

const Formulario = () => {
  const [data, setData] = useState({
    id: 0,
    nombreProducto: "",
    stockActual: 0,
    precioLista: 0,
    descuentoUno: 0,
    costoIntermedio: 0,
    descuentoDos: 0,
    costoFinal: 0,
    incremento: 0,
    precioSugerido: 0,
    precioFinal: 0,
    ganancia: 0,
    categoria: "",
    fabrica: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <form className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label>ID Producto</label>
        <input type="text" value={data.id} readOnly />
      </div>

      <div className={styles.formGroup}>
        <label>Nombre del Producto</label>
        <input
          type="text"
          name="nombre"
          value={data.nombreProducto}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Stock</label>
        <input
          type="number"
          name="stockActual"
          value={data.stock}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Precio Lista</label>
        <input
          type="number"
          name="precioLista"
          value={data.precioLista}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Descuento uno</label>
        <input
          type="number"
          name="descuentoUno"
          value={data.descuentoUno}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Costo Intermedio</label>
        <input
          type="number"
          name="costoIntermedio"
          value={data.costoIntermedio}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Descuento dos</label>
        <input
          type="number"
          name="descuentoDos"
          value={data.descuentoDos}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Costo Final</label>
        <input
          type="number"
          name="costoFinal"
          value={data.costoFinal}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Incremento</label>
        <input
          type="number"
          name="incremento"
          value={data.incremento}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Precio Sugerido</label>
        <input
          type="number"
          name="precioSugerido"
          value={data.precioSugerido}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Precio Final</label>
        <input
          type="number"
          name="precioFinal"
          value={data.precioFinal}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Ganancia</label>
        <input
          type="number"
          name="precioFinal"
          value={data.precioFinal}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Categoría</label>
        <select name="categoria" value={data.categoria} onChange={handleChange}>
          <option value="">Seleccione Categoría</option>
          {/* Ejemplos: */}
          <option value="Alimentos para Gatos">Alimentos para Gatos</option>
          <option value="Alimentos para Perros">Alimentos para Perros</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Fábrica</label>
        <select name="fabrica" value={data.fabrica} onChange={handleChange}>
          <option value="">Seleccione Fábrica</option>
          {/* Ejemplos: */}
          <option value="Nutripet">Nutripet</option>
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => alert("Se cancelo la operacion!")}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.saveButton}`}
          onClick={() => alert("Se enviaron los datos!")}
        >
          Guardar y Cerrar
        </button>
      </div>
    </form>
  );
};

export default Formulario;
