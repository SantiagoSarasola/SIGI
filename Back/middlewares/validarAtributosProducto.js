
import { body } from "express-validator";

const validarAtributosProducto = (method) => [
    body("nombreProducto").notEmpty().withMessage("El nombre del producto no puede estar vacío").bail().isAlphanumeric('es-ES',{ignore: ' '}).withMessage("El nombre del producto debe ser alfanumérico").bail().isLength({ max: 100 }).withMessage("El nombre del producto no puede tener más de 100 caracteres").bail().matches(/[a-zA-Z]/).withMessage("El nombre del producto debe contener al menos una letra"),
    body("stockActual").notEmpty().withMessage("El stock actual no puede estar vacío").bail().isInt().withMessage("El stock actual debe ser un número entero").bail().custom((value) => value >= 0).withMessage("El stock actual no puede ser negativo").bail(),
    body("precioLista").notEmpty().withMessage("El precio de lista no puede estar vacío").bail().isFloat({ min: 0 }).withMessage("El precio de lista no puede ser negativo").bail(),
    body("descuentoUno").notEmpty().withMessage("El primer descuento no puede estar vacío").bail().isFloat({ min: 0 }).withMessage("El primer descuento no puede ser negativo").bail(),
    body("descuentoDos").notEmpty().withMessage("El segundo descuento no puede estar vacío").bail().isFloat({ min: 0 }).withMessage("El segundo descuento no puede ser negativo").bail(),
    body("incremento").notEmpty().withMessage("El incremento no puede estar vacío").bail().isFloat({ min: 0 }).withMessage("El incremento no puede ser negativo").bail(),
    body("precioFinal").notEmpty().withMessage("El precio final no puede estar vacío").bail().isFloat({ min: 0 }).withMessage("El precio final no puede ser negativo").bail(),
    body("idCategoria").notEmpty().withMessage("El id de la categoría no puede estar vacío").bail().isInt().withMessage("El id de la categoría debe ser un número entero").bail().custom((value) => value >= 0).withMessage("El id de la categoría no puede ser negativo").bail(),
    body("modificadoPor").notEmpty().withMessage("El id del usuario modificador no puede estar vacío").bail().isInt().withMessage("El id del usuario modificador debe ser un número entero").bail().custom((value) => value >= 0).withMessage("El id del usuario modificador no puede ser negativo").bail(),
  ...(method === "PUT" ? [
      body("modificadoPor").notEmpty().withMessage("El id del usuario modificador no puede estar vacío").bail()
          .isInt().withMessage("El id del usuario modificador debe ser un número entero").bail()
          .custom((value) => value >= 0).withMessage("El id del usuario modificador no puede ser negativo").bail()
  ] : []),
  ];

export default validarAtributosProducto;
