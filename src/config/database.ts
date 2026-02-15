import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error ("La url de la base de datos no está definida en las variables de entorno");
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("Conectado a PostgreSQL...");
});

pool.on("error", (err) => {
    console.log(`Algo está fallando en la conexión ${err}`);
});