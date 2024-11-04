import express from "express";
import { db } from "../db.js";
import validarPaginacionProductos from "../middlewares/validarPaginacionProductos.js";
import validarId from "../middlewares/validarId.js";
import validarAtributosProducto from "../middlewares/validarAtributosProducto.js";
import { validationResult } from "express-validator";
const router = express.Router();

router.get("/", validarPaginacionProductos(), async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    sort = "nombre_producto",
    order = "ASC",
  } = req.query;

  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }

  try {
    const sql = "CALL spVerProductos(?, ?, ?, ?)";
    const [productos] = await db.execute(sql, [offset, limit, sort, order]);

    return res.status(200).send({ productos: productos[0] });
  } catch (error) {
    return res.status(500).send({ error: "Error al traer productos" });
  }
});

router.put(
  "/:id",
  validarId(),
  validarAtributosProducto(),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errores: validacion.array() });
      return;
    }

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

    const sql =
      "CALL spModificarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try {
      await db.query(sql, [
        nombreProducto,
        stockActual,
        precioLista,
        descuentoUno,
        costoIntermedio,
        descuentoDos,
        costoFinal,
        incremento,
        precioSugerido,
        precioFinal,
        ganancia,
        idCategoria,
        idFabrica,
        id,
      ]);

      return res.status(200).send({
        producto: {
          id,
          nombreProducto,
          stockActual,
          precioLista,
          descuentoUno,
          costoIntermedio,
          descuentoDos,
          costoFinal,
          incremento,
          precioSugerido,
          precioFinal,
          ganancia,
          idCategoria,
          idFabrica,
        },
      });
    } catch (error) {
      console.error("Error al editar el producto: ", error.message);
      return res.status(500).send({ error: "Error al editar el producto" });
    }
  }
);

router.post("/", validarAtributosProducto(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

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

  try {
    await db.execute(
      `CALL spNuevoProducto (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombreProducto,
        stockActual,
        precioLista,
        descuentoUno,
        costoIntermedio,
        descuentoDos,
        costoFinal,
        incremento,
        precioSugerido,
        precioFinal,
        ganancia,
        idCategoria,
        idFabrica,
      ]
    );

    return res.status(201).send({ producto: { nombreProducto } });
  } catch (error) {
    console.error("Error al insertar el producto: ", error.message);
    return res.status(500).send({ error: "Error al insertar el producto" });
  }
});

router.delete("/:id", validarId(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

  const id = Number(req.params.id);

  const sql = "CALL spEliminarProducto(?)";

  try {
    await db.query(sql, [id]);
    return res.status(200).send({ id });
  } catch (error) {
    console.error("Error al eliminar el producto: ", error.message);
    return res.status(500).send({ error: "Error al eliminar el producto" });
  }
});

export default router;
