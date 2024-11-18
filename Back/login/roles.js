import express from "express";
import { db } from "../db.js";
import validarAtributosUsuario from "../middlewares/validarAtributosUsuario.js";
import validarId from "../middlewares/validarId.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";
import validarPermisosUsuario from "../middlewares/validarPermisosUsuario.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM roles";
    const [roles] = await db.execute(sql);

    return res.status(200).send({ roles });
  } catch (error) {
    return res.status(500).send({ error: "Error al traer roles" });
  }
});

router.post("/", async (req, res) => {
  //   const validacion = validationResult(req);
  //   if (!validacion.isEmpty()) {
  //     return res.status(400).send({ errores: validacion.array() });
  //   }

  const nombre = req.body.nombre;
  try {
    const sql = "INSERT INTO roles (nombre) VALUES (?)";
    await db.execute(sql, [nombre]);

    return res.status(200).send({ rol: { nombre } });
  } catch (error) {
    return res.status(500).send({ error: "Error al crear rol" });
  }
});

router.delete("/:id", validarId(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

  const id = Number(req.params.id);

  const sql = "DELETE FROM roles WHERE id = ?";

  try {
    await db.query(sql, [id]);
    return res.status(200).send({ id });
  } catch (error) {
    console.error("Error al eliminar rol: ", error.message);
    return res.status(500).send({ error: "Error al eliminar rol" });
  }
});

export default router;
