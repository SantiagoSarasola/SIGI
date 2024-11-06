import express from "express";
import { db } from "../db.js";
import validarAtributosUsuario from "../middlewares/validarAtributosUsuario.js";
import validarId from "../middlewares/validarId.js";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        let sql = "SELECT * FROM usuarios";
        const [usuarios] = await db.execute(sql);

        return res.status(200).send({ usuarios });
      } catch (error) {
        return res.status(500).send({ error: "Error al traer usuarios" });
      }
});

router.post("/", validarAtributosUsuario(), async (req, res) => {

    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        return res.status(400).send({ errores: validacion.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
    const idRol = req.body.idRol;

    const passwordHashed = await bcrypt.hash(password, 10);
    try{
        const sql = "CALL spNuevoUsuario(?,?,?)";
        await db.execute(sql, [email, passwordHashed, idRol]);

        return res.status(200).send({usuario: {email, idRol}});
    } catch (error){
        return res.status(500).send({ error: "Error al crear usuario"});
    };
});

router.delete("/:id", validarId(), async(req,res) => {
  
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errores: validacion.array() });
      return;
    }
  
    const id = Number(req.params.id);
  
    const sql = "CALL spEliminarUsuario(?)";
  
    try {
      await db.query(sql, [id]);
      return res.status(200).send({ id });
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error.message);
      return res.status(500).send({ error: "Error al eliminar el usuario" });
    }
  });

export default router;
