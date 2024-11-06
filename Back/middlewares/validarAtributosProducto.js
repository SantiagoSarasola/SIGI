
import { body } from "express-validator";

const validarAtributosProducto = () => [
    body("nombreProducto").isAlphanumeric('es-ES',{ignore: ' '}).notEmpty().isLength({ max: 100 }).matches(/[a-zA-Z]/),
    body("stockActual").isInt({ min: 1 }).notEmpty(),
    body("precioLista").isFloat({ min: 0 }).notEmpty(),
    body("descuentoUno").isFloat({ min: 0 }).notEmpty(),
    body("descuentoDos").isFloat({ min: 0 }).notEmpty(),
    body("incremento").isFloat({ min: 0 }).notEmpty(),
    body("precioFinal").isFloat({ min: 0 }).notEmpty(),
    body("idCategoria").isInt({ min: 1 }).notEmpty(),
  ];

export default validarAtributosProducto;