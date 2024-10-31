import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    sort = "nombre_producto",
    order = "ASC",
  } = req.query;

  const sql = "CALL get_productos(?, ?, ?, ?)";
  const [productos] = await db.execute(sql, [offset, limit, sort, order]);

  res.send({ productos });
});

export default router;
