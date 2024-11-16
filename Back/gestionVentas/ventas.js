import express from "express";
import { db } from "../db.js";
import validarId from "../middlewares/validarId.js";
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
      formaPago: ventaProductos[0][0].forma_pago,
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

router.post("/", async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

  const ventaTotal = req.body.ventaTotal;
  const cantidadTotal = req.body.cantidadTotal;
  const idFormaPago = req.body.idFormaPago;
  const productos = req.body.productos;
  
  try {
    const sqlInsertarVenta = 'CALL spCrearVenta (?,?,?)';
    const resultadoVentaInsertada = await db.execute(sqlInsertarVenta, [ventaTotal, cantidadTotal, idFormaPago]);
    const idVenta = resultadoVentaInsertada[0][0][0].id_venta;;
    
    const sqlInsertarVentasProductos = "CALL spCrearVentasProducto (?, ?, ?, ?)"
    const sqlModificarStockActualProducto = "CALL spModificarStockActual (?, ?)"

    for (const producto of productos) {
      const idProducto = producto.idProducto;
      const cantidad = producto.cantidad;
      const ventaSubTotal = producto.ventaSubTotal;
  
      await db.execute(sqlInsertarVentasProductos, [idVenta, idProducto, cantidad, ventaSubTotal]);
      await db.execute(sqlModificarStockActualProducto, [idProducto, cantidad]);
    }

    return res.status(201).send({ venta: { idVenta } });
  } catch (error) {
    console.error("Error al insertar la venta: ", error.message);
    return res.status(500).send({ error: "Error al insertar la venta" });
  }
});

router.delete("/:id", validarId(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

  const id = Number(req.params.id);

  const sql = "CALL spEliminarVenta(?)";

  try {
    await db.execute(sql, [id]);
    return res.status(200).send({ id });
  } catch (error) {
    console.error("Error al eliminar la venta: ", error.message);
    return res.status(500).send({ error: "Error al eliminar la venta" });
  }
});

export default router;
