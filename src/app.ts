import express from "express";
import dotenv from "dotenv";
import etlRoutes from "./routes/etl.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Rutas ETL
app.use("/api",etlRoutes);


app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});