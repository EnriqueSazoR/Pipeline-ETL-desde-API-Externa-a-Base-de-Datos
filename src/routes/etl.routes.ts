import { Router } from "express";
import { extractCryptoPrices } from "../etl/extract.js";
import { transformCryptoPrices } from "../etl/transform.js";
import { runETL } from "../etl/runETL.js";

const router = Router();

// Get --> Extracción y Transformación de datos
router.get("/extract/:coin", async (req, res) => {
    try {
        const {coin} = req.params;
        const rawData = await extractCryptoPrices(coin, 1);
        const transformed = transformCryptoPrices(rawData)

        res.json(transformed.slice(0, 5));
    } catch (error) {
        res.status(500).json({error : "Error al extraer los datos"});
    }
});

router.post("/run/:coin", async (req, res) => {
    try {
        const {coin} = req.params;

        await runETL(1, coin);

        res.json({message : "ETL executed successfully"});
    } catch (error) {
        res.status(500).json({error : "ETL execution failed"});
    }
});

export default router;