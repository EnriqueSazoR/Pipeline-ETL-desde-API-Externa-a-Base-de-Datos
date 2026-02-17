import { pool } from "../config/database.js";
import type { TransformedPriceRecord } from "./transform.js";

export const loadPriceData = async (
    coinId: number,
    records: TransformedPriceRecord[]
): Promise<number> => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        let rowsInserted = 0;

        for (const record of records) {
            const result = await client.query(
                `INSERT INTO price_history
                (coin_id, price, market_cap, volume_24h, price_timestamp)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (coin_id, price_timestamp) DO NOTHING`,

                [

                    coinId,
                    record.price,
                    record.market_cap,
                    record.volume_24h,
                    record.price_timestamp, 
                ]
            );
                rowsInserted += result.rowCount ?? 0;
        }

        await client.query("COMMIT");

        return rowsInserted;
        
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};