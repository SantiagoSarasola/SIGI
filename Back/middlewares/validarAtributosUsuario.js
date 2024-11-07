import {body, validationResult} from "express-validator";

const validarAtributosUsuario = () => [
    body("email").isAlphanumeric().notEmpty().isLength({max : 50}),
    body("password").isStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:0
    }).isLength({max : 60}),
    body("idRol").isInt({ min: 1 }).notEmpty()
];

export default validarAtributosUsuario;