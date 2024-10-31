import express from "express";
import { db } from "../db.js";
import validarId from "../middlewares/validarId.js";
import validarAtributosProducto from "../middlewares/validarAtributosProducto.js";

const router = express.Router();

router.put("/:id", validarId, validarAtributosProducto, async(req,res) => {
    const id = Number(req.params.id);
    const nombreProducto = req.body.nombreProducto;
    const stockActual = req.body.stockActual;
    const precioLista = req.body.precioLista;
    const descuentoUno = req.body.descuentoUno;
    const costoIntermedio = req.body.costoIntermedio;
    const descuentoDos = req.body.descuentoDos;
    const costoFinal = req.body.costoFinal;
    const incremento = req.body.incremento;
    const precioSugerido = req.body.precioSugerido;
    const precioFinal = req.body.precioFinal;
    const ganancia = req.body.ganancia;
    const idCategoria = req.body.idCategoria;
    const idFabrica = req.body.idFabrica;

    const sql = "CALL ModificarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    const [result] = await db.query(sql,[
        nombreProducto, stockActual, precioLista, descuentoUno, costoIntermedio, descuentoDos, costoFinal,
        incremento, precioSugerido, precioFinal, ganancia,
        idCategoria, idFabrica, id]);
    console.log(result);
    res.status(200).send({producto: {
        id, nombreProducto, stockActual, precioLista, descuentoUno, costoIntermedio, descuentoDos, costoFinal,
        incremento, precioSugerido, precioFinal, ganancia,
        idCategoria, idFabrica}
    });

});

export default router;
