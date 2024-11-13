import express from "express";
import { db } from "../db.js";
import validarPaginacionProductos from "../middlewares/validarPaginacionProductos.js";
import validarId from "../middlewares/validarId.js";
import validarAtributosProducto from "../middlewares/validarAtributosProducto.js";
import { validationResult } from "express-validator";
const router = express.Router();

router.get("/", /*validarPaginacionProductos(),*/ async (req, res) => {
  // const validacion = validationResult(req);
  // if (!validacion.isEmpty()) {
  //   return res.status(400).send({ errores: validacion.array() });
  // }

  try {
    // const sqlFetchProductos = "CALL spVerProductos(?, ?, ?, ?,?)";
    // const [productos] = await db.execute(sqlFetchProductos, [
    //   offset,
    //   limit,
    //   sort,
    //   order,
    //   search,
    // ]);

    // const sqlTotalProductos =
    //   "SELECT COUNT(*) AS total FROM productos WHERE inhabilitado = FALSE AND nombre_producto LIKE ?;";
    // const [total] = await db.execute(sqlTotalProductos, [`%${search}%`]);
    // const ventas = "SELECT * FROM ventas";
    
    const sqlFetchVentasProductos = 
      "SELECT id_venta, total_venta, cantidad_productos, id_forma_pago, fecha " + 
      "FROM ventas";
    const [ventas2] = await db.execute(sqlFetchVentasProductos);
    return res.status(200).send({ ventas2});
  } catch (error) {
    return res.status(500).send({ error: "Error al traer ventas de productos" });
  }
});

router.get("/:id/ventas_producto", validarId(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }

  const id = Number(req.params.id);

  try {
    const sql = 
      "SELECT p.nombre_producto, p.precio_final, vp.cantidad, vp.subtotal_venta, v.fecha " + 
      "FROM ventas v " + 
      "JOIN ventas_producto vp " + 
      "ON v.id_venta = vp.id_venta " +
      "JOIN productos p " +
      "ON vp.id_producto = p.id_producto " +
      "WHERE vp.id_venta = ?";
    // const sql = "CALL spVerProductoPorId(?)";
    const [ventaProductos] = await db.execute(sql, [id]);

    if (ventaProductos[0].length === 0) {
      return res.status(404).send({ error: "Venta de productos no encontrada" });
    }

    // return res.status(200).send({ ventaProductos: ventaProductos[0][0] });
    return res.status(200).send({ ventaProductos });
  } catch (error) {
    console.error("Error al traer la venta de productos: ", error.message);
    return res.status(500).send({ error: "Error al traer la venta de productos" });
  }
});

router.put(
  "/:id",
  validarId(),
  validarAtributosProducto("PUT"),
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
    const descuentoDos = req.body.descuentoDos;
    const incremento = req.body.incremento;
    const precioFinal = req.body.precioFinal;
    const idCategoria = req.body.idCategoria;
    const modificadoPor = req.body.modificadoPor;

    const sql = "CALL spModificarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try {
      await db.execute(sql, [
        nombreProducto,
        stockActual,
        precioLista,
        descuentoUno,
        descuentoDos,
        incremento,
        precioFinal,
        idCategoria,
        modificadoPor,
        id,
      ]);

      return res.status(200).send({
        producto: {
          id,
          nombreProducto,
          stockActual,
          precioLista,
          descuentoUno,
          descuentoDos,
          incremento,
          precioFinal,
          idCategoria,
          modificadoPor,
        },
      });
    } catch (error) {
      console.error("Error al editar el producto: ", error.message);
      return res.status(500).send({ error: "Error al editar el producto" });
    }
  }
);

router.post("/", validarAtributosProducto("POST"), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

  const nombreProducto = req.body.nombreProducto;
  const stockActual = req.body.stockActual;
  const precioLista = req.body.precioLista;
  const descuentoUno = req.body.descuentoUno;
  const descuentoDos = req.body.descuentoDos;
  const incremento = req.body.incremento;
  const precioFinal = req.body.precioFinal;
  const idCategoria = req.body.idCategoria;

  try {
    await db.execute(`CALL spNuevoProducto (?, ?, ?, ?, ?, ?, ?, ?)`, [
      nombreProducto,
      stockActual,
      precioLista,
      descuentoUno,
      descuentoDos,
      incremento,
      precioFinal,
      idCategoria,
    ]);

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
    await db.execute(sql, [id]);
    return res.status(200).send({ id });
  } catch (error) {
    console.error("Error al eliminar el producto: ", error.message);
    return res.status(500).send({ error: "Error al eliminar el producto" });
  }
});

export default router;
