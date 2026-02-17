import { extractCryptoPrices } from "./extract.js";
import { transformCryptoPrices } from "./transform.js";
import { loadPriceData } from "./load.js";
import { getLastProcessedTimestamp, updateLastProcessedTimestamp, insertEtlLog } from "../repositories/etl.repository.js";

const PROCESS_NAME = "crypto_price_etl";

export const runETL = async (coinId: number, coinSlug: string) => {
    try {
        console.log("Starting ETL...");

        const lastProcessed = await getLastProcessedTimestamp(PROCESS_NAME);

        const rawData = await extractCryptoPrices(coinSlug,1);
        const transformed = await transformCryptoPrices(rawData);

        const filtered = lastProcessed
            ? transformed.filter(
                (r) => r.price_timestamp > lastProcessed
            )
            : transformed;
            
            if (filtered.length === 0) {
                console.log("No new records to insert.");
                await insertEtlLog("success", 0);
                return;
            }

            const rowsInserted = await loadPriceData(coinId, filtered);

            const newTimestamp = 
                filtered[filtered.length - 1]?.price_timestamp;

            if (newTimestamp) {
                await updateLastProcessedTimestamp(PROCESS_NAME, newTimestamp);
            }

            await insertEtlLog("SUCCESS", rowsInserted);

            console.log(`Inserted ${rowsInserted} rows.`);
    } catch (error: any) {
        console.error("ETL failed:", error.message);
        await insertEtlLog("FAILED", 0, error.message);
    }
}; 