import { param } from "express-validator";

const validarId = () => param("id").isInt({ min: 1 });

export default validarId;