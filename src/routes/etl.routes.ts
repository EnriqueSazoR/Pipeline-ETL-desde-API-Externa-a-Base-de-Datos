import { Router } from "express";
import { extractCryptoPrices } from "../etl/extract.js";
import { transformCryptoPrices } from "../etl/transform.js";

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

export default router;