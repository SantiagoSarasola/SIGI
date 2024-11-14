import { body } from "express-validator";

const validarAtributosUsuario = () => [
  body("email")
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("El formato del email es inválido")
    .bail()
    .isLength({ max: 50 })
    .withMessage("El email no puede tener más de 50 caracteres"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacío")
    .bail()
    .isLength({ max: 60 })
    .withMessage("La contraseña no puede tener más de 60 caracteres"),
];

export default validarAtributosUsuario;
