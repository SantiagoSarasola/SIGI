import express from "express";
import { db } from "../db.js";
import validarId from "../middlewares/validarId.js";
import validarAtributosProducto from "../middlewares/validarAtributosProducto.js";
import { validationResult } from "express-validator";
const router = express.Router();

router.get("/", async (req, res) => {

  try {
    const sql = "CALL spVerVentas()";
    const [ventas] = await db.execute(sql);
    return res.status(200).send({ ventas : ventas[0]});
  } catch (error) {
    return res.status(500).send({ error: "Error al traer ventas" });
  }
});

router.get("/:id/ventas_producto", validarId(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }

  const id = Number(req.params.id);

  try {
    const sql = "CALL spVerVentaYProductosPorId (?)";
    const [ventaProductos] = await db.execute(sql, [id]);

    if (ventaProductos[0].length === 0) {
      return res.status(404).send({ error: "Venta de productos no encontrada" });
    }

    const ventaYProductos = {
      idVenta: ventaProductos[0][0].id_venta,
      fecha: ventaProductos[0][0].fecha,
      ventaTotal: ventaProductos[0][0].venta_total,
      idFormaPago: ventaProductos[0][0].id_forma_pago,
      cantidadTotal: ventaProductos[0][0].cantidad_total,
      productos: []
    };

    ventaProductos[0].forEach(producto => {
      ventaYProductos.productos.push({
        idProducto : producto.id_producto,
        nombreProducto : producto.nombre_producto,
        stockActual : producto.stock_actual,
        precioLista : producto.precio_lista,
        precioFinal : producto.precio_final,
        precioLista : producto.precio_lista,
        cantidad : producto.cantidad,
        subTotal : producto.venta_subtotal
      })
    })

    return res.status(200).send({ ventaYProductos });
  } catch (error) {
    console.error("Error al traer la venta y  los productos: ", error.message);
    return res.status(500).send({ error: "Error al traer la venta y  los productos" });
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
