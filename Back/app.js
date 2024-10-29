import express from "express";
import cors from "cors";
import { connectDB } from "./db";

connectDB();

const app = express();
const PORT = 3000;

// Interpretar JSON en el body.
app.use(express.json());

// Habilitamos CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola Grupo!");
});

app.listen(PORT, (err) => {
  console.log(
    err
      ? "Se produjo un error al iniciar el servidor"
      : `Servidor levantado en http://localhost:${PORT}`
  );
});
