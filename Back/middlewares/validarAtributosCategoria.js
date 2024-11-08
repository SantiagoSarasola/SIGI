import { body } from "express-validator";

const validarAtributosCategoria = [
    body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("El campo descripcion no puede estar vacía")
    .bail()
    .isLength({ min: 2 })
    .withMessage("La categoria debe tener al menos 2 caracteres")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("La descripción solo debe contener letras")
];

export default validarAtributosCategoria;
