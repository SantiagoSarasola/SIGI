import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res)=>{
    const {nombre_producto, stock_actual, precio_lista, descuento_uno, costo_intermedio, descuento_dos, costo_final, incremento, precio_sugerido, precio_final, ganancia, id_categoria, id_fabrica} = req.body;

    try {
        await db.execute( `CALL spNuevoProducto (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nombre_producto, stock_actual, precio_lista, descuento_uno, costo_intermedio, descuento_dos, costo_final, incremento, precio_sugerido, precio_final, ganancia, id_categoria, id_fabrica] );

        return res.status(201).json({producto: {nombre_producto}});
    } catch (error) {
        console.error("Error al insertar el producto: ", error.message);
        return res.status(500).json({ error: "Error al insertar el producto" });
    }

})

export default router;
