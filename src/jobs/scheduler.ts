import cron from "node-cron";
import { runETL } from "../etl/runETL.js";

// Ejecutar cada 5 minutos
cron.schedule("0 2 * * *", async () => {
    console.log("Running scheduled ETL...");

    try {
        await runETL(1, "bitcoin");
        console.log("Daily ETL finsished successfully");
    } catch (error) {
        console.error("Daily ETL failed", error);
    }
});