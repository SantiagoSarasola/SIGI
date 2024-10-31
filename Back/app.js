import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import routerProductos from "./inventario/productos.js";

connectDB();
console.log("Base de Datos conectada");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

// Conecta la ruta "productos" con el router
app.use("/productos", routerProductos);

app.listen(PORT, (err) => {
  console.log(
    err
      ? "Se produjo un error al iniciar el servidor"
      : `Servidor levantado en http://localhost:${PORT}`
  );
});
